"use client";

import { useState } from "react";
import Image from "next/image";

import slide01 from "/public/img/design_01.jpeg";
import slide02 from "/public/img/design_02.jpeg";
import slide03 from "/public/img/design_03.jpeg";
import slide04 from "/public/img/design_04.jpeg";

const slides = [
  { src: slide01, title: "Project 01" },
  { src: slide02, title: "Project 02" },
  { src: slide03, title: "Project 03" },
  { src: slide04, title: "Project 04" },
];

export default function DesignPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f1e8] text-black">
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6">
        <h1 className="mb-10 text-[32px] font-bold tracking-widest md:text-[56px]">
          DESIGN
        </h1>

        <div className="relative w-full max-w-[1100px] h-[520px] overflow-hidden">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative flex min-w-full items-center justify-center px-4"
              >
                <div className="relative w-full max-w-[760px] aspect-[4/3] overflow-hidden rounded-[24px] border-2 border-black bg-white shadow-xl">
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>

                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border-2 border-black bg-white px-5 py-2 text-[12px] tracking-widest">
                  {slide.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-6">
          <button
            type="button"
            onClick={prevSlide}
            className="rounded-full border-2 border-black bg-white px-5 py-2 text-sm tracking-widest transition hover:scale-105"
          >
            PREV
          </button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-3 w-3 rounded-full border border-black transition ${
                  activeIndex === index ? "bg-black" : "bg-white"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            className="rounded-full border-2 border-black bg-white px-5 py-2 text-sm tracking-widest transition hover:scale-105"
          >
            NEXT
          </button>
        </div>
      </section>
    </main>
  );
}