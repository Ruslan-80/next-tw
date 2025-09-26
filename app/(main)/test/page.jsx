"use client";
import { useState } from "react";
import { Phone, Mail, X } from "lucide-react";
import { Button } from "../../../components/ui/button";

import { Input } from "../../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import Image from "next/image";

export default function Home() {
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    console.log("Phone submitted:", phone);
    setPhone("");
    setPhoneModalOpen(false);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
    setEmailModalOpen(false);
  };

  return (
    <div className="container mx-auto min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">
            Получите ВНЖ в России в 2025 году
          </h1>
          <p className="mt-2 text-lg">
            Профессиональная помощь в оформлении вида на жительство
          </p>
          <div className="mt-4 flex space-x-4">
            <Button
              onClick={() => setPhoneModalOpen(true)}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Phone className="mr-2 h-5 w-5" /> Связаться по телефону
            </Button>
            <Button
              onClick={() => setEmailModalOpen(true)}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Mail className="mr-2 h-5 w-5" /> Связаться по email
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Как получить ВНЖ в России в 2025 году: полная инструкция с
            обновлениями
          </h2>
          <p className="text-gray-700">
            Хотите получить вид на жительство (ВНЖ) в России? В 2025 году
            процедура оформления ВНЖ в РФ остается ключевым шагом для
            иностранных граждан, желающих жить, работать и интегрироваться в
            Российской Федерации. Наша компания поможет оформить ВНЖ быстро и
            без ошибок. В этой статье расскажем, что нужно для получения ВНЖ,
            какие документы нужны, как подать заявление, и разберем правила
            оформления для иностранцев в Москве, СПб и других регионах.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Что такое ВНЖ и зачем он нужен иностранному гражданину
          </h2>
          <p className="text-gray-700">
            Вид на жительство в России — это документ, который дает иностранцу
            право на постоянное проживание в РФ. Он выдается бессрочно (кроме
            случаев для ВКС и лиц без гражданства) и выглядит как синяя
            книжечка, заменяющая паспорт иностранного гражданина в России.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Преимущества ВНЖ:</h3>
              <ul className="list-disc pl-5 text-gray-700">
                <li>
                  Жить в любом регионе Российской Федерации без ограничений.
                </li>
                <li>Работать без патента или разрешения.</li>
                <li>
                  Оформить полис ОМС и получать бесплатную медицинскую помощь.
                </li>
                <li>Открыть ИП и вести бизнес.</li>
                <li>
                  Подать на российское гражданство после 5 лет проживания.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Обязанности с ВНЖ:</h3>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Соблюдать законы РФ.</li>
                <li>
                  Подтверждать доход не ниже прожиточного минимума (Москва — от
                  27 302 ₽/мес. в 2025 году).
                </li>
                <li>Ежегодно подавать уведомление о проживании (ГУВМ МВД).</li>
                <li>
                  Зарегистрироваться по месту жительства (прописка) в течение 7
                  дней после получения ВНЖ.
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            ВНЖ — это шаг к гражданству РФ или комфортной жизни в России для
            тех, кто не планирует его оформлять. Узнайте, какие условия подходят
            вам, с нашей помощью!
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Кто имеет право на ВНЖ: категории и основания
          </h2>
          <p className="text-gray-700">
            Получить ВНЖ в России могут иностранные граждане и лица без
            гражданства, попадающие в следующие категории:
          </p>
          <ul className="list-disc pl-5 text-gray-700 mt-4">
            <li>
              <strong>Общий порядок:</strong> Иностранцы с РВП (разрешением на
              временное проживание), прожившие в РФ не менее 8 месяцев.
            </li>
            <li>
              <strong>Упрощенный порядок (без РВП):</strong>
              <ul className="list-disc pl-5">
                <li>Родились в РСФСР или имели гражданство СССР.</li>
                <li>Имеют родителей или детей — граждан РФ.</li>
                <li>Окончили российский вуз очно с красным дипломом.</li>
                <li>Граждане Беларуси, Казахстана, Молдовы, Украины.</li>
                <li>Высококвалифицированные специалисты (ВКС) и их семьи.</li>
                <li>
                  Состоят в браке с гражданином РФ минимум 3 года или имеют
                  общего ребенка (новое правило с 25 января 2025).
                </li>
                <li>Участники программы переселения соотечественников.</li>
                <li>Беженцы или получившие убежище.</li>
              </ul>
            </li>
          </ul>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">
              Сравнение общего и упрощенного порядка
            </h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Параметр</th>
                  <th className="border p-2">Общий порядок</th>
                  <th className="border p-2">Упрощенный порядок</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Нужен РВП</td>
                  <td className="border p-2">Да (8 мес. проживания)</td>
                  <td className="border p-2">Нет</td>
                </tr>
                <tr>
                  <td className="border p-2">Срок подачи</td>
                  <td className="border p-2">За 4 мес. до конца РВП</td>
                  <td className="border p-2">В любое время</td>
                </tr>
                <tr>
                  <td className="border p-2">Основания</td>
                  <td className="border p-2">Проживание по РВП</td>
                  <td className="border p-2">
                    Специальные категории (граждане СНГ, брак, ВКС и т.д.)
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Документы</td>
                  <td className="border p-2">Стандартный пакет + РВП</td>
                  <td className="border p-2">
                    Стандартный пакет + документы по основанию
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-gray-700">
            Хочу получить ВНЖ? Мы поможем определить, какой порядок подходит, и
            подготовим все необходимые документы!
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Пошаговая инструкция: как оформить ВНЖ в 2025 году
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Общий порядок</h3>
              <ol className="list-decimal pl-5 text-gray-700">
                <li>Получите РВП и живите по нему 8 месяцев.</li>
                <li>Соберите документы (см. ниже).</li>
                <li>
                  Подайте заявление в МВД, ММЦ (в Москве — «Сахарово») или через
                  Госуслуги.
                </li>
                <li>Дождитесь решения (до 4 месяцев).</li>
                <li>
                  Зарегистрируйтесь по месту жительства в течение 7 дней после
                  выдачи ВНЖ.
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Упрощенный порядок</h3>
              <ol className="list-decimal pl-5 text-gray-700">
                <li>
                  Убедитесь, что вы подходите под одно из оснований (например,
                  брак с гражданином РФ).
                </li>
                <li>
                  Соберите перечень документов (включая дополнительные по
                  основанию).
                </li>
                <li>Подайте в МВД или Госуслуги.</li>
                <li>
                  Получите решение (2–3 месяца для граждан СНГ, ВКС,
                  переселенцев).
                </li>
                <li>Оформите прописку.</li>
              </ol>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            Совет: Онлайн-подача через сайт Госуслуг экономит время, но требует
            явки для сверки оригиналов.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Какие документы нужны для ВНЖ: полный список
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Заявление (2 экземпляра, бланк на сайте МВД или в ММЦ).</li>
            <li>
              Паспорт иностранца + нотариально заверенный перевод (от 1000 ₽).
            </li>
            <li>Фотографии (4 шт., 35x45 мм, матовые, без ретуши).</li>
            <li>
              Сертификат о знании русского языка, истории и законов РФ (экзамен
              — 5900 ₽, не нужен при наличии аттестата СССР/РФ).
            </li>
            <li>
              Справка о доходах (2-НДФЛ, выписка из банка с суммой от 4 ПМ,
              например, 109 208 ₽ для Москвы).
            </li>
            <li>Госпошлина (6000 ₽, оплатить через банк или Госуслуги).</li>
            <li>
              Медицинские справки (об отсутствии ВИЧ, наркотиков, инфекций).
            </li>
            <li>
              Справка об отсутствии судимости (для визовых стран, если нет РВП).
            </li>
            <li>
              Дополнительные документы (для упрощенки: свидетельство о браке,
              диплом, и т.д.).
            </li>
          </ul>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">
              Документы по категориям
            </h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Документ</th>
                  <th className="border p-2">Общий порядок</th>
                  <th className="border p-2">Упрощенный порядок</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Заявление</td>
                  <td className="border p-2">Да</td>
                  <td className="border p-2">Да</td>
                </tr>
                <tr>
                  <td className="border p-2">Паспорт + перевод</td>
                  <td className="border p-2">Да</td>
                  <td className="border p-2">Да</td>
                </tr>
                <tr>
                  <td className="border p-2">Фото 35x45</td>
                  <td className="border p-2">4 шт.</td>
                  <td className="border p-2">4 шт.</td>
                </tr>
                <tr>
                  <td className="border p-2">Сертификат экзамена</td>
                  <td className="border p-2">Да (если нет аттестата)</td>
                  <td className="border p-2">Да (если нет аттестата)</td>
                </tr>
                <tr>
                  <td className="border p-2">Справка о доходах</td>
                  <td className="border p-2">Да</td>
                  <td className="border p-2">Да</td>
                </tr>
                <tr>
                  <td className="border p-2">Госпошлина</td>
                  <td className="border p-2">6000 ₽</td>
                  <td className="border p-2">6000 ₽</td>
                </tr>
                <tr>
                  <td className="border p-2">Медсправки</td>
                  <td className="border p-2">Да</td>
                  <td className="border p-2">Да</td>
                </tr>
                <tr>
                  <td className="border p-2">Несудимость</td>
                  <td className="border p-2">Да (если требуется)</td>
                  <td className="border p-2">Да (если требуется)</td>
                </tr>
                <tr>
                  <td className="border p-2">Дополнительно</td>
                  <td className="border p-2">РВП</td>
                  <td className="border p-2">Документы по основанию</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-gray-700">
            Требования к фото: анфас, без головного убора, матовая бумага,
            взгляд в объектив. Требования к доходам: сумма на счете или зарплата
            не ниже ПМ за 4 месяца.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Экзамен по русскому языку, истории и законам: как подготовиться
          </h2>
          <p className="text-gray-700">
            Экзамен обязателен для большинства иностранцев, кроме:
          </p>
          <ul className="list-disc pl-5 text-gray-700 mt-4">
            <li>Детей до 18 лет.</li>
            <li>Пенсионеров (мужчины 65+, женщины 60+).</li>
            <li>Граждан Беларуси, Украины.</li>
            <li>ВКС и их семей.</li>
            <li>Участников программы переселения.</li>
          </ul>
          <p className="mt-4 text-gray-700">
            Что проверяют: умение читать, писать, говорить на русском, знание
            базовой истории и законов РФ.
            <br />
            Стоимость: 5900 ₽ (с 10 декабря 2024 — только в госучреждениях).
            <br />
            Продолжительность: 90 мин (русский) + 30 мин (история/законы).
            <br />
            Где сдавать: в аккредитованных центрах (список на сайте МВД).
            <br />
            Подготовка: используйте материалы на сайте ФИПИ или запишитесь на
            наши курсы подготовки.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Медицинское освидетельствование: где пройти и что проверяют
          </h2>
          <p className="text-gray-700">
            Медкомиссия обязательна для всех. Проверяют отсутствие:
          </p>
          <ul className="list-disc pl-5 text-gray-700 mt-4">
            <li>ВИЧ, сифилиса, туберкулеза, лепры.</li>
            <li>Наркотической зависимости.</li>
          </ul>
          <p className="mt-4 text-gray-700">
            Где пройти: в уполномоченных медцентрах (список в МВД).
            <br />
            Срок действия справок: 12 месяцев.
            <br />
            Стоимость: варьируется, уточняйте в центрах.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Сроки рассмотрения и возможные отказы
          </h2>
          <p className="text-gray-700">
            Сроки рассмотрения зависят от основания:
          </p>
          <ul className="list-disc pl-5 text-gray-700 mt-4">
            <li>2 месяца: переселенцы.</li>
            <li>3 месяца: граждане Беларуси, ВКС.</li>
            <li>4 месяца: общий порядок.</li>
          </ul>
          <p className="mt-4 text-gray-700">
            Проверить статус: на сайте МВД или в ММЦ.
            <br />
            Причины отказа:
          </p>
          <ul className="list-disc pl-5 text-gray-700 mt-4">
            <li>2+ административных нарушения за год.</li>
            <li>Доходы ниже ПМ.</li>
            <li>Ложные данные или поддельные документы.</li>
            <li>Непогашенная судимость.</li>
            <li>Фиктивный брак (проверяется МВД).</li>
          </ul>
          <p className="mt-4 text-gray-700">
            Как обжаловать:
            <br />
            - Административно: жалоба в ГУВМ МВД.
            <br />- Судебно: иск в суд (более эффективно).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            После получения ВНЖ: регистрация, подтверждение и замена
          </h2>
          <p className="text-gray-700">После выдачи ВНЖ:</p>
          <ul className="list-disc pl-5 text-gray-700 mt-4">
            <li>
              Зарегистрируйтесь (прописка) в течение 7 дней в МВД или МФЦ.
            </li>
            <li>
              Подтверждайте проживание ежегодно (до конца года выдачи + 2 мес.).
            </li>
            <li>
              Документы для подтверждения: уведомление, паспорт, справка о
              доходах.
            </li>
            <li>Штраф за просрочку: до 7000 ₽.</li>
            <li>Аннуляция: при неуведомлении 2 года.</li>
          </ul>
          <p className="mt-4 text-gray-700">
            Меняйте ВНЖ в 14, 20, 45 лет (в течение 30 дней после дня рождения).
            <br />
            Переезд: ВНЖ позволяет жить в любом регионе (Москва, СПб и др.), но
            нужна регистрация в течение 7 дней.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            ВНЖ за инвестиции и специальные случаи
          </h2>
          <p className="text-gray-700">
            Иностранец может получить ВНЖ за инвестиции:
          </p>
          <ul className="list-disc pl-5 text-gray-700 mt-4">
            <li>Вклад в соцпроекты: от 15 млн руб.</li>
            <li>Юрлицо с налогами от 4–6 млн руб. (2–3 года работы).</li>
            <li>Недвижимость от 20 млн руб.</li>
          </ul>
          <p className="mt-4 text-gray-700">Особые случаи:</p>
          <ul className="list-disc pl-5 text-gray-700 mt-4">
            <li>Дети до 18 лет с родителями.</li>
            <li>Родители граждан РФ.</li>
            <li>
              Выпускники вузов (с 2025: без красного диплома, стаж 6 мес.).
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Часто задаваемые вопросы (FAQ)
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                Какая госпошлина за ВНЖ?
              </h3>
              <p className="text-gray-700">6000 ₽ в 2025 году.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Можно ли подать на ВНЖ без РВП?
              </h3>
              <p className="text-gray-700">
                Да, по упрощенному порядку (граждане СНГ, брак и т.д.).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Что делать, если потерял ВНЖ?
              </h3>
              <p className="text-gray-700">
                Обратитесь в МВД с паспортом и справкой из полиции.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Как скоро подать на гражданство?
              </h3>
              <p className="text-gray-700">
                Через 5 лет с ВНЖ (или раньше для льготных категорий).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Нужна ли прописка?</h3>
              <p className="text-gray-700">
                Да, в течение 7 дней после получения ВНЖ.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Можно ли переехать в другой регион?
              </h3>
              <p className="text-gray-700">
                Да, с регистрацией в течение 7 дней.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Что делать при отказе?</h3>
              <p className="text-gray-700">
                Исправить ошибки и подать заново через год или обжаловать.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Какие справки нужны для медкомиссии?
              </h3>
              <p className="text-gray-700">
                Об отсутствии ВИЧ, наркотиков, инфекций.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Почему стоит обратиться к нам для оформления ВНЖ
          </h2>
          <p className="text-gray-700">
            Оформление ВНЖ в России — сложный процесс, требующий точной
            подготовки документов и соблюдения правил. Наша компания:
          </p>
          <ul className="list-disc pl-5 text-gray-700 mt-4">
            <li>Проведет консультацию по вашему случаю.</li>
            <li>Поможет собрать пакет документов.</li>
            <li>Сопроводит на экзаменах и подаче.</li>
          </ul>
          <p className="mt-4 text-gray-700">
            Готовы оформить ВНЖ без лишних хлопот? Запишитесь на бесплатную
            консультацию на нашем сайте или свяжитесь с нами:
          </p>
          <div className="mt-4 flex space-x-4">
            <Button
              onClick={() => setPhoneModalOpen(true)}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <Phone className="mr-2 h-5 w-5" /> Связаться по телефону
            </Button>
            <Button
              onClick={() => setEmailModalOpen(true)}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <Mail className="mr-2 h-5 w-5" /> Связаться по email
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <p className="text-center">
            © 2025 ВНЖ в России. Все права защищены.
          </p>
        </div>
      </footer>

      {/* Phone Modal */}
      <Dialog open={phoneModalOpen} onOpenChange={setPhoneModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Связаться по телефону</DialogTitle>
            <DialogDescription>
              Введите ваш номер телефона, и мы свяжемся с вами для консультации.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <Input
              type="tel"
              placeholder="+7 (XXX) XXX-XX-XX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Отправить
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Email Modal */}
      <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Связаться по email</DialogTitle>
            <DialogDescription>
              Введите ваш email, и мы свяжемся с вами для консультации.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Отправить
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
