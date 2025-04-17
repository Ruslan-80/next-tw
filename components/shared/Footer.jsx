import Image from "next/image";
import Logo from "@/public/mainLogo.svg";

export default function Footer() {
    return (
        <>
            <footer className="bg-[#26262d] text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row">
                        <div className="mb-6 md:mb-0 md:w-1/4">
                            <Image
                                src={Logo}
                                alt="Kapital Stroy"
                                className="h-10 w-auto mb-4"
                            />
                            <div className="flex space-x-4 mt-4">
                                <a href="tel:88007776008" className="text-sm">
                                    +7 (499) 390-14-67
                                </a>
                                <a href="tel:84951817240" className="text-sm">
                                    +7 (926) 276-24-15
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:w-3/4">
                            <div>
                                <h3 className="font-semibold mb-3">Контакты</h3>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-3">
                                    Доставка и оплата
                                </h3>
                                <h3 className="font-semibold mt-4">
                                    Гарантия и возврат
                                </h3>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-3">Акции</h3>
                                <h3 className="font-semibold mt-4">
                                    Бонусная программа
                                </h3>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-3">
                                    Политика конфиденциальности
                                </h3>
                                <h3 className="font-semibold mt-4">
                                    Договор-оферта
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-700 text-sm flex flex-col md:flex-row justify-between">
                        <p>© 2025 Kapital Stroy</p>
                        <p>
                            Адрес офиса: г. Москва, улица Чермянская, дом 1,
                            строение 1
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
