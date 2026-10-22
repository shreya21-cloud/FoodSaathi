import React from "react";
import { Star, Quote, Heart, ArrowUpRight } from "lucide-react";

export const Testimonials = () => {
  const reviews = [
    {
      quote:
        "FoodSaathi changed our banquet operations completely. Instead of throwing away hundreds of fresh buffet portions at 11 PM, a courier is matched and picks them up within 30 minutes.",
      author: "Chef Ranveer Kapoor",
      role: "Executive Chef, The Grand Royale Hotel",
      image:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&auto=format&fit=crop&q=60",
      rating: 5,
      type: "FOOD DONOR",
    },
    {
      quote:
        "The priority classification is a game-changer. We know exactly which hot meals need immediate distribution and which bakery goods can wait for breakfast shelter runs.",
      author: "Dr. Sunita Sharma",
      role: "Director, Hope Food Shelter",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=60",
      rating: 5,
      type: "COMMUNITY PARTNER",
    },
    {
      quote:
        "As a volunteer bike rider, the turn-by-turn route suggestions and clear pickup instructions make each rescue mission smooth and fulfilling.",
      author: "Alex Rivera",
      role: "Volunteer Rescue Courier",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=60",
      rating: 5,
      type: "VOLUNTEER",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-t border-[#e7e8dd] bg-[#faf9f4] py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3.5 py-2">
              <Heart size={14} className="text-emerald-700" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800">
                The people behind the purpose
              </span>
            </div>

            <h2 className="text-4xl font-semibold leading-[1.12] tracking-[-0.045em] text-[#193d30] sm:text-5xl lg:text-6xl">
              Every meal has
              <br />
              <span className="font-serif italic font-normal text-emerald-700">
                a story to tell.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-slate-600 sm:text-base lg:pb-1">
            A food rescue network works when donors, community organizations,
            and volunteers work together toward a shared purpose.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((item, idx) => {
            const featured = idx === 1;

            return (
              <article
                key={item.author}
                className={`group relative flex flex-col overflow-hidden rounded-[26px] border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-28px_rgba(25,61,48,0.3)] sm:p-7 ${
                  featured
                    ? "border-[#244c39] bg-[#204634] text-white"
                    : "border-[#e6e7de] bg-white/90 text-[#193d30] hover:border-emerald-200"
                }`}
              >
                {featured && (
                  <>
                    <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/10" />
                    <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-emerald-400/10 blur-2xl" />
                  </>
                )}

                <div className="relative flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                      featured
                        ? "bg-white/10 text-amber-200 ring-1 ring-white/10"
                        : "bg-emerald-50 text-emerald-800"
                    }`}
                  >
                    <Quote size={21} />
                  </div>

                  <span
                    className={`text-[10px] font-mono ${
                      featured ? "text-white/40" : "text-slate-300"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>

                <div className="relative mt-7 flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span
                    className={`ml-2 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      featured ? "text-white/55" : "text-slate-400"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <blockquote
                  className={`relative mt-4 flex-1 text-sm leading-7 ${
                    featured ? "text-white/85" : "text-slate-600"
                  }`}
                >
                  “{item.quote}”
                </blockquote>

                <div
                  className={`relative mt-7 border-t pt-5 ${
                    featured ? "border-white/15" : "border-[#edeee7]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.author}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className={`h-12 w-12 shrink-0 rounded-full object-cover ${
                        featured
                          ? "border-2 border-white/30"
                          : "border-2 border-emerald-100"
                      }`}
                    />

                    <div className="min-w-0">
                      <h3
                        className={`text-sm font-semibold ${
                          featured ? "text-white" : "text-[#193d30]"
                        }`}
                      >
                        {item.author}
                      </h3>
                      <p
                        className={`mt-1 text-[11px] leading-5 ${
                          featured ? "text-white/60" : "text-slate-500"
                        }`}
                      >
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Closing strip */}
        <div className="mt-8 flex flex-col gap-3 rounded-[22px] border border-[#e3e7dc] bg-white/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
              <Heart size={18} />
            </div>
            <p className="text-sm leading-6 text-slate-600">
              <span className="font-semibold text-[#193d30]">
                One shared mission.
              </span>{" "}
              Less food waste, more meals reaching communities.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            Built for collective impact
            <ArrowUpRight size={15} />
          </div>
        </div>

        <p className="mt-4 text-center text-[10px] leading-5 text-slate-400">
          Note: Display these testimonials as real endorsements only if the
          individuals and organizations have verified and approved them.
        </p>
      </div>
    </section>
  );
};
