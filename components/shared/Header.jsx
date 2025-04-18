import Link from "next/link";
import {
    Mail,
    Headset,
    MapPin,
    ChartNoAxesColumn,
    User,
    ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/public/mainLogo.svg";
import Form from "next/form";

export default function Header() {
    return (
        <header className="w-full ">
            <div className="w-full  bg-white border-b border-gray-400">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-full py-3">
                        <nav className="flex space-x-4 text-black text-sm">
                            <Link
                                href="/delivery"
                                className="hover:text-red-500"
                            >
                                Доставки и оплата
                            </Link>
                            <Link href="#" className="hover:text-red-500">
                                Гарантии и возврат
                            </Link>
                            <Link href="#" className="hover:text-red-500">
                                Контакты
                            </Link>
                        </nav>
                        <div className="flex items-center space-x-4 text-black text-sm">
                            <Link
                                href="mailto:snab@kplstroy.ru"
                                className="flex items-center gap-2 hover:text-red-500"
                            >
                                <Mail width={16} /> snab@kplstroy.ru
                            </Link>
                            <Link
                                href="tel:+7 (499) 390-14-67"
                                className="flex items-center gap-2 hover:text-red-500"
                            >
                                <Headset width={16} /> +7 (499) 390-14-67
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-2 hover:text-red-500"
                            >
                                <MapPin width={16} /> Москва
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-between h-full py-1">
                        <div className="max-w-60">
                            <Link href="/">
                                <Image src={Logo} alt="logo" />
                            </Link>
                        </div>
                        <div className="flex items-center justify-between">
                            {/* <button className="flex items-center justify-center px-5 py-3 ml-5 text-white bg-red-500 rounded-xl hover:bg-red-600">
                                Каталог
                            </button> */}
                            <Form className="flex justify-between text-black ml-5 w-150">
                                <input
                                    name="query"
                                    placeholder="Поиск"
                                    className="w-150 mr-5 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
                                />
                                {/* <button type="submit">Поиск</button> */}
                            </Form>
                        </div>
                        <div className="flex justify-end gap-5">
                            <div className=" rounded-full bg-gray-200 p-2 hover:bg-gray-400 ">
                                <ChartNoAxesColumn
                                    size={24}
                                    strokeWidth={1}
                                    color="black"
                                />
                            </div>
                            <Link
                                href="/admin"
                                className="rounded-full bg-gray-200 p-2 hover:bg-gray-400"
                            >
                                <User size={24} strokeWidth={1} color="black" />
                            </Link>
                            <div className=" rounded-full bg-gray-200 p-2 hover:bg-gray-400">
                                <ShoppingCart
                                    size={24}
                                    strokeWidth={1}
                                    color="black"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-3">
                        <nav>
                            <ul className="flex items-center justify-between py-2 space-x-4 text-black text-xl uppercase font-bold">
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-red-500"
                                    >
                                        модульное оборудование
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-red-500"
                                    >
                                        щиты и шкафы
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-red-500"
                                    >
                                        Электромонтажные изделия
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-red-500"
                                    >
                                        Автоматизация
                                    </Link>
                                </li>
                                <li className="animate-bounce">
                                    <Link href="#" className=" text-red-500">
                                        Акции
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
