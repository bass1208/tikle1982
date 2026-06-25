"use client";

import { useRef, useState, type PointerEvent } from "react";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";

type CarouselItem = {
  key: string;
  label: string;
  src: StaticImageData;
  width: number;
  height: number;
  href: string;
};

type CarouselProps = {
  items: CarouselItem[];
};

export default function Carousel({ items }: CarouselProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(1);

  const startXRef = useRef(0);
  const pointerDownIndexRef = useRef<number | null>(null);
  const isPointerDownRef = useRef(false);

  const rotateNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const rotatePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handlePointerDown = (
    e: PointerEvent<HTMLButtonElement>,
    index: number
  ) => {
    startXRef.current = e.clientX;
    pointerDownIndexRef.current = index;
    isPointerDownRef.current = true;
  };

  const handlePointerUp = (e: PointerEvent<HTMLButtonElement>) => {
    if (!isPointerDownRef.current) return;

    const diff = e.clientX - startXRef.current;
    const clickedIndex = pointerDownIndexRef.current;

    isPointerDownRef.current = false;
    pointerDownIndexRef.current = null;

    if (Math.abs(diff) > 70) {
      if (diff < 0) {
        rotatePrev();
      } else {
        rotateNext();
      }

      return;
    }

    if (clickedIndex === null) return;

    if (clickedIndex === activeIndex) {
      router.push(items[clickedIndex].href);
      return;
    }

    setActiveIndex(clickedIndex);
  };

  const getPosition = (index: number) => {
    const total = items.length;
    const diff = (index - activeIndex + total) % total;

    const angleMap = [90, 210, 330];
    const angle = angleMap[diff];
    const rad = (angle * Math.PI) / 180;
    const isCenter = diff === 0;

    return {
      x: Math.cos(rad),
      y: Math.sin(rad),
      scale: isCenter ? 1.1 : 0.4,
      zIndex: isCenter ? 30 : 20,
      opacity: isCenter ? 1 : 0.6,
    };
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center -translate-y-[40px] md:-translate-y-[20px]">
      <div className="relative w-[100vw] max-w-[760px] h-[320px] md:h-[420px] touch-pan-y select-none">
        {items.map((item, index) => {
          const pos = getPosition(index);
          const isCenter = index === activeIndex;

          return (
            <button
              key={item.key}
              type="button"
              onPointerDown={(e) => handlePointerDown(e, index)}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="group absolute left-1/2 top-1/2 flex flex-col items-center transition-all duration-700 ease-in-out cursor-pointer"
              style={{
                transform: `
                  translate(-50%, -50%)
                  translate3d(
                    calc(${pos.x} * min(300px, 32vw)),
                    calc(${pos.y} * min(95px, 12vw)),
                    0
                  )
                  scale(${pos.scale})
                `,
                zIndex: pos.zIndex,
                opacity: pos.opacity,
              }}
            >
              <div
                className={`
                  relative transition-transform duration-300 ease-out
                  ${isCenter ? "group-hover:scale-[1.15]" : ""}
                `}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  width={item.width}
                  height={item.height}
                  priority={isCenter}
                  draggable={false}
                  className="pointer-events-none select-none w-[150px] h-auto md:w-[250px]"
                />
              </div>

              <p className="mt-[8px] text-center text-black text-[13px] md:text-[16px]">
                {item.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}