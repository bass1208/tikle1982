import Image from "next/image";
import Carousel from "./components/Carousel";

import bg from "/public/img/16-9.jpeg";
import cdsLogo from "/public/img/cds_1.png";
import girl from "/public/img/girl.png";
import imgImac from "/public/img/img_imac.png";
import imgGb from "/public/img/img_gb.png";
import iconInsta from "/public/icon/icon_insta.png";
import iconPint from "/public/icon/icon_pint.png";
import iconX from "/public/icon/icon_x.png";

const items = [
  {
    key: "gb",
    label: "Game",
    src: imgGb,
    width: 250,
    height: 250,
    href: "/game",
  },
  {
    key: "girl",
    label: "Hobby",
    src: girl,
    width: 150,
    height: 150,
    href: "/hobby",
  },
  {
    key: "imac",
    label: "Design",
    src: imgImac,
    width: 250,
    height: 250,
    href: "/design",
  },
];

export default function Home() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-cover bg-center font-[family-name:var(--font-geist-sans)]"
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
    >
      <div className="absolute left-1/2 z-0 pointer-events-none top-[80px] -translate-x-1/2 md:top-[140px]">
        <Image
          className="float-typo w-[80vw] max-w-[340px] h-auto md:w-[400px]"
          src={cdsLogo}
          alt="cds logo"
          priority
        />
      </div>

      <Carousel items={items} />

      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-end pb-[36px] md:pb-[140px]">
        <div className="flex items-center justify-center gap-[34px] mb-[34px] md:gap-[60px] md:mb-[60px]">
          <a
            href="https://www.instagram.com/bass1208"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link float-up"
            
          >
            <Image
              src={iconInsta}
              alt="Instagram"
              width={50}
              height={50}
              className="w-[40px] md:w-[50px] h-auto"
            />
          </a>

          <a
            href="https://jp.pinterest.com/tiklej/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link float-down"
           
          >
            <Image
              src={iconPint}
              alt="Pinterest"
              width={50}
              height={50}
              className="w-[40px] md:w-[50px] h-auto"
            />
          </a>

          <a
            href="https://x.com/bass1208"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link float-up"
           
          >
            <Image
              src={iconX}
              alt="X"
              width={50}
              height={50}
              className="w-[40px] md:w-[50px] h-auto"
            />
          </a>
        </div>

        <div className="text-center text-[12px] md:text-[14px] leading-[14px] text-black">
          <p className="mb-[8px]">© TIKLE</p>
          <p>Creative Design Studio based in tokyo</p>
        </div>
      </div>
    </main>
  );
}