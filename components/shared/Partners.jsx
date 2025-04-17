import React from "react";
import Image from "next/image";
import "./partners.css";

const Partners = () => {
    return (
        <section className="partners max-w-[1280px] mx-auto mb-20">
            <div className="container_my">
                <div className="partners__inner">
                    <h3 className="text-3xl  text-gray-700 mb-20 text-center">
                        При производстве используются комплектующие ведущих
                        производителей
                    </h3>
                    <div className="partners__logo">
                        <Image
                            src="/images/box/DKC.jpg"
                            width={178}
                            height={80}
                            alt="logp"
                        />
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
