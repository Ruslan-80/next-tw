import React from "react";
import Image from "next/image";
import "./partners.css";

const Partners = () => {
  return (
    <section className="partners max-w-[1280px] mx-auto mb-20">
      <div className="container_my">
        <div className="partners__inner ">
          {/* <h1 className="text-3xl lg:text-5xl uppercase">
            Precision Engineering &{" "}
            <span className="text-gold">
              При производстве используются комплектующие ведущих производителей
            </span>
          </h1>

          <button className="btn-gold animate-gold-shimmer">
            Запросить расчет
          </button>
          <h3 className="text-3xl  text-gray-700 mb-20 text-center">
            При производстве используются комплектующие ведущих производителей
          </h3> */}
          <div className="partners__logo card-industrial">
            <div className="group">
              <figure
                className="w-[175px] h-[28px] bg-[#E31F0E] transition-colors duration-300
      [mask-repeat:no-repeat] [mask-position:center] [mask-size:contain]
      [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center] [-webkit-mask-size:contain]
      group-hover:bg-transparent"
                style={{
                  WebkitMaskImage: `url(/images/partners/dkc.svg)`,
                  maskImage: `url(/images/partners/dkc.svg)`,
                }}
              />

              <img
                src="/images/partners/dkc.svg"
                className="w-[175px] h-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                alt=""
              />

              <div
                className="w-[89px] h-[34px] bg-[#2e3a59] hover:bg-[#E31F0E] transition-colors duration-300
                  [mask-repeat:no-repeat] [mask-position:center] [mask-size:contain]
                  [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]
                  [-webkit-mask-size:contain]"
                style={{
                  WebkitMaskImage: `url(/images/partners/iek.svg)`,
                  maskImage: `url(/images/partners/iek.svg)`,
                }}
              />
            </div>

            {/* <Image
              src="/images/box/DKC.jpg"
              width={178}
              height={80}
              alt="logp"
            /> */}
            <Image
              src="/images/box/IEK.png"
              width={172}
              height={80}
              alt="logp"
            />
            <Image
              src="/images/box/KEAZ.jpg"
              width={203}
              height={80}
              alt="logp"
            />
            <Image
              src="/images/box/ABB.png"
              width={197}
              height={80}
              alt="logp"
            />
            <Image
              src="/images/box/ekf-log-16.02.18.png"
              width={262}
              height={80}
              alt="logp"
            />
            <Image
              src="/images/box/scheider-electric.png"
              width={266}
              height={80}
              alt="logp"
            />
            <Image
              src="/images/box/wago.png"
              width={233}
              height={80}
              alt="logp"
            />
            <Image
              src="/images/box/kvt.png"
              width={169}
              height={80}
              alt="logp"
            />
            <Image
              src="/images/box/legrand.jpg"
              width={317}
              height={80}
              alt="logp"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
