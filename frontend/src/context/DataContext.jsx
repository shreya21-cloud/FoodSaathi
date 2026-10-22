import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import api from "../services/api";

import {
  initialDonations,
  initialNGOs,
  initialVolunteers,
  initialDeliveries,
} from "../services/mockData";

import { classifyFoodPriority, calculateDistance } from "../utils/aiAlgorithms";

const DataContext = createContext(null);

const STORAGE_KEYS = {
  donations: "foodrescue_donations",
  ngos: "foodrescue_ngos",
  volunteers: "foodrescue_volunteers",
  deliveries: "foodrescue_deliveries",
};

const safeRead = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);

    if (value === null) return fallback;

    const parsed = JSON.parse(value);

    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    console.warn("Could not read local data:", key, error);
    return fallback;
  }
};

const numberValue = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const statusValue = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const isSuccessfulResponse = (result) =>
  result.status === "fulfilled" &&
  result.value?.data?.success === true &&
  Array.isArray(result.value.data.data);

export const DataProvider = ({ children }) => {
  const [donations, setDonations] = useState(() =>
    safeRead(STORAGE_KEYS.donations, initialDonations),
  );

  const [ngos, setNGOs] = useState(() =>
    safeRead(STORAGE_KEYS.ngos, initialNGOs),
  );

  const [volunteers, setVolunteers] = useState(() =>
    safeRead(STORAGE_KEYS.volunteers, initialVolunteers),
  );

  const [deliveries, setDeliveries] = useState(() =>
    safeRead(STORAGE_KEYS.deliveries, initialDeliveries),
  );

  const [loading, setLoading] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.donations, JSON.stringify(donations));
    } catch (error) {
      console.warn("Could not save donations:", error);
    }
  }, [donations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ngos, JSON.stringify(ngos));
    } catch (error) {
      console.warn("Could not save NGOs:", error);
    }
  }, [ngos]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.volunteers, JSON.stringify(volunteers));
    } catch (error) {
      console.warn("Could not save volunteers:", error);
    }
  }, [volunteers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.deliveries, JSON.stringify(deliveries));
    } catch (error) {
      console.warn("Could not save deliveries:", error);
    }
  }, [deliveries]);

  const refreshFromBackend = useCallback(async () => {
    setLoading(true);

    try {
      const results = await Promise.allSettled([
        api.get("/donations"),
        api.get("/ngos"),
        api.get("/volunteers"),
        api.get("/deliveries"),
      ]);

      const [donResult, ngoResult, volResult, delResult] = results;

      const connected = results.some(
        (result) =>
          result.status === "fulfilled" && result.value?.data?.success === true,
      );

      setIsBackendConnected(connected);

      if (isSuccessfulResponse(donResult)) {
        setDonations(donResult.value.data.data);
      }

      if (isSuccessfulResponse(ngoResult)) {
        setNGOs(ngoResult.value.data.data);
      }

      if (isSuccessfulResponse(volResult)) {
        setVolunteers(volResult.value.data.data);
      }

      if (isSuccessfulResponse(delResult)) {
        setDeliveries(delResult.value.data.data);
      }
    } catch (error) {
      setIsBackendConnected(false);
      console.error("Backend refresh failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshFromBackend();
  }, [refreshFromBackend]);

  const addDonation = async (donationData) => {
    const priorityResult = classifyFoodPriority(
      donationData.expiryTime,
      donationData.category,
      donationData.mealCount,
    );

    const newDonation = {
      ...donationData,
      _id: "don_" + Date.now(),
      mealCount: numberValue(donationData.mealCount),
      quantityKg:
        numberValue(donationData.quantityKg) ||
        numberValue(donationData.mealCount) * 0.45,
      priority: priorityResult.priority,
      priorityReason: priorityResult.reason,
      status: "Available",
      createdAt: new Date().toISOString(),
      location: donationData.location || {
        lat: 28.6139,
        lng: 77.209,
      },
    };

    try {
      const response = await api.post("/donations", newDonation);

      if (response.data?.success && response.data.data) {
        setDonations((previous) => [response.data.data, ...previous]);

        return response.data.data;
      }
    } catch (error) {
      console.warn("Donation API unavailable; saving locally.");
    }

    setDonations((previous) => [newDonation, ...previous]);

    return newDonation;
  };

  const updateDonation = async (id, updates) => {
    try {
      await api.put("/donations/" + id, updates);
    } catch (error) {
      console.warn("Donation update saved locally.");
    }

    setDonations((previous) =>
      previous.map((donation) =>
        donation._id === id
          ? {
              ...donation,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : donation,
      ),
    );
  };

  const deleteDonation = async (id) => {
    try {
      await api.delete("/donations/" + id);
    } catch (error) {
      console.warn("Donation deletion handled locally.");
    }

    setDonations((previous) =>
      previous.filter((donation) => donation._id !== id),
    );
  };

  const matchDonationWithNGO = async (donationId, ngo) => {
    const donation = donations.find((item) => item._id === donationId);

    if (!donation || !ngo) return null;

    const matchedUpdate = {
      status: "Matched",
      matchedNGO: {
        id: ngo._id,
        name: ngo.organizationName,
      },
    };

    try {
      await api.put("/donations/" + donationId, matchedUpdate);
    } catch (error) {
      console.warn("Matching update handled locally.");
    }

    setDonations((previous) =>
      previous.map((item) =>
        item._id === donationId ? { ...item, ...matchedUpdate } : item,
      ),
    );

    const distance = calculateDistance(
      donation.location?.lat ?? 28.6139,
      donation.location?.lng ?? 77.209,
      ngo.location?.lat ?? 28.6139,
      ngo.location?.lng ?? 77.209,
    );

    const newDelivery = {
      _id: "del_" + Date.now(),
      donationId,
      ngoId: ngo._id,
      volunteerId: null,
      foodName: donation.foodName,
      mealCount: numberValue(donation.mealCount),
      quantityKg: numberValue(donation.quantityKg),
      donorName: donation.donorName,
      ngoName: ngo.organizationName,
      volunteerName: "Unassigned",
      pickupAddress: donation.pickupAddress,
      dropoffAddress: ngo.address,
      pickupLocation: donation.location,
      dropoffLocation: ngo.location,
      status: "Assigned",
      priority: donation.priority,
      estimatedDistanceKm: distance,
      assignedAt: new Date().toISOString(),
      notes: "Matched via FoodRescue AI Matchmaker.",
    };

    try {
      const response = await api.post("/deliveries/assign", newDelivery);

      if (response.data?.success && response.data.data) {
        setDeliveries((previous) => [response.data.data, ...previous]);

        return response.data.data;
      }
    } catch (error) {
      console.warn("Delivery assignment handled locally.");
    }

    setDeliveries((previous) => [newDelivery, ...previous]);

    return newDelivery;
  };

  const updateNGORequirements = async (ngoId, updates) => {
    try {
      await api.post("/ngos/requirements", {
        ngoId,
        ...updates,
      });
    } catch (error) {
      console.warn("NGO requirements updated locally.");
    }

    setNGOs((previous) =>
      previous.map((ngo) => (ngo._id === ngoId ? { ...ngo, ...updates } : ngo)),
    );
  };

  const toggleVolunteerAvailability = async (volunteerId, isAvailable) => {
    try {
      await api.put("/volunteers/availability", {
        volunteerId,
        isAvailable,
      });
    } catch (error) {
      console.warn("Volunteer availability updated locally.");
    }

    setVolunteers((previous) =>
      previous.map((volunteer) =>
        volunteer._id === volunteerId
          ? { ...volunteer, isAvailable }
          : volunteer,
      ),
    );
  };

  const assignVolunteerToDelivery = async (deliveryId, volunteer) => {
    if (!volunteer) return;

    const updates = {
      volunteerId: volunteer._id,
      volunteerName: volunteer.fullName,
      status: "Accepted",
    };

    try {
      await api.put("/deliveries/" + deliveryId + "/status", updates);
    } catch (error) {
      console.warn("Volunteer assignment updated locally.");
    }

    const delivery = deliveries.find((item) => item._id === deliveryId);

    setDeliveries((previous) =>
      previous.map((item) =>
        item._id === deliveryId ? { ...item, ...updates } : item,
      ),
    );

    if (delivery) {
      setDonations((previous) =>
        previous.map((donation) =>
          donation._id === delivery.donationId
            ? {
                ...donation,
                status: "Assigned",
                assignedVolunteer: {
                  id: volunteer._id,
                  name: volunteer.fullName,
                  phone: volunteer.phone,
                },
              }
            : donation,
        ),
      );
    }
  };

  const updateDeliveryStatus = async (deliveryId, status, notes = "") => {
    const updates = { status, notes };

    if (statusValue(status) === "picked up") {
      updates.pickedUpAt = new Date().toISOString();
    }

    if (statusValue(status) === "delivered") {
      updates.deliveredAt = new Date().toISOString();
    }

    try {
      await api.put("/deliveries/" + deliveryId + "/status", updates);
    } catch (error) {
      console.warn("Delivery status updated locally.");
    }

    const delivery = deliveries.find((item) => item._id === deliveryId);

    setDeliveries((previous) =>
      previous.map((item) =>
        item._id === deliveryId ? { ...item, ...updates } : item,
      ),
    );

    if (delivery) {
      setDonations((previous) =>
        previous.map((donation) =>
          donation._id === delivery.donationId
            ? { ...donation, status }
            : donation,
        ),
      );
    }
  };

  const resetDemoData = () => {
    setDonations(initialDonations);
    setNGOs(initialNGOs);
    setVolunteers(initialVolunteers);
    setDeliveries(initialDeliveries);

    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  const summaryMetrics = useMemo(() => {
    const delivered = deliveries.filter(
      (delivery) => statusValue(delivery.status) === "delivered",
    );

    const totalMealsRescued = delivered.reduce(
      (total, delivery) => total + numberValue(delivery.mealCount),
      0,
    );

    const deliveredKg = delivered.reduce(
      (total, delivery) => total + numberValue(delivery.quantityKg),
      0,
    );

    const availableDonationsCount = donations.filter(
      (donation) => statusValue(donation.status) === "available",
    ).length;

    const activeNGOsCount = ngos.filter((ngo) =>
      Boolean(ngo.activeDemand),
    ).length;

    const availableVolunteersCount = volunteers.filter((volunteer) =>
      Boolean(volunteer.isAvailable),
    ).length;

    const urgentDonationsCount = donations.filter(
      (donation) =>
        statusValue(donation.priority) === "critical" &&
        statusValue(donation.status) === "available",
    ).length;

    const activeDeliveriesCount = deliveries.filter((delivery) =>
      ["assigned", "accepted", "picked up"].includes(
        statusValue(delivery.status),
      ),
    ).length;

    const estimatedFoodKg = deliveredKg || totalMealsRescued * 0.45;

    return {
      totalMealsRescued,
      availableDonationsCount,
      activeNGOsCount,
      availableVolunteersCount,
      urgentDonationsCount,
      completedDeliveriesCount: delivered.length,
      activeDeliveriesCount,
      co2SavedKg: Math.round(estimatedFoodKg * 2.5),
    };
  }, [donations, ngos, volunteers, deliveries]);

  return (
    <DataContext.Provider
      value={{
        donations,
        ngos,
        volunteers,
        deliveries,
        summaryMetrics,
        loading,
        isBackendConnected,
        addDonation,
        updateDonation,
        deleteDonation,
        matchDonationWithNGO,
        updateNGORequirements,
        toggleVolunteerAvailability,
        assignVolunteerToDelivery,
        updateDeliveryStatus,
        resetDemoData,
        refreshFromBackend,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used inside DataProvider");
  }

  return context;
};
