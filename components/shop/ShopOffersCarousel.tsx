"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "@/lib/utils";

import "swiper/css";

const OFFERS = [
  {
    id: "off-30",
    eyebrow: "Limited time",
    title: "Up to 30% OFF",
    subtitle: "On renewed M.R.P. — certified & tested",
    tone: "primary",
  },
  {
    id: "off-delivery",
    eyebrow: "Bengaluru",
    title: "FREE Delivery",
    subtitle: "Metro delivery on eligible units",
    tone: "dark",
  },
  {
    id: "off-warranty",
    eyebrow: "Peace of mind",
    title: "1 Year Warranty",
    subtitle: "100+ point inspection included",
    tone: "primary",
  },
] as const;

export default function ShopOffersCarousel() {
  return (
    <div className="shop-offers-carousel w-full px-0">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={10}
        loop
        speed={650}
        autoplay={{
          delay: 3200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="shop-offers-swiper !overflow-hidden rounded-lg"
        aria-label="Shop offers"
      >
        {OFFERS.map((offer) => (
          <SwiperSlide key={offer.id} className="shop-offers-slide">
            <div
              className={cn(
                "shop-offer-slide flex flex-col justify-center rounded-lg px-3 py-1.5",
                offer.tone === "primary" ? "shop-offer-slide--primary" : "shop-offer-slide--dark",
              )}
            >
              <p className="shop-offer-title font-bold leading-tight">
                {offer.title}
              </p>
              <p className="shop-offer-sub mt-0.5 truncate leading-tight opacity-90">
                {offer.subtitle}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
