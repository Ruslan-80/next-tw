export default function DocumentationTab() {
    const documents = [
        {
            id: 1,
            name: "3D - модель",
            format: "STEP",
            size: "4.7 МБ",
            link: "https://market.ekfgroup.com/uploads/products/CFFB063CD2234697FA90DFFC32F4F119.STEP",
        },
        {
            id: 2,
            name: "Документация",
            format: "PDF",
            size: "161.2 КБ",
            link: "https://market.ekfgroup.com/uploads/products/CB8F43319CD9F50FAD15D3CAFDFE0842.pdf",
        },
        {
            id: 3,
            name: "Документация",
            format: "PDF",
            size: "9.3 МБ",
            link: "https://market.ekfgroup.com/uploads/products/3855C378BF1A42A0246A315CAF1C7B8C.pdf",
        },
        {
            id: 4,
            name: "Инструкция",
            format: "PDF",
            size: "1.1 МБ",
            link: "https://market.ekfgroup.com/uploads/products/F1F83C20993AC9B3F398D6B385A4D6EA.pdf",
        },
        {
            id: 5,
            name: "Мастер-каталог",
            format: "PDF",
            size: "937.5 КБ",
            link: "https://market.ekfgroup.com/uploads/products/6425D88F7DB539CBD5387146EB414772.pdf",
        },
        {
            id: 6,
            name: "Паспорт",
            format: "PDF",
            size: "454.0 КБ",
            link: "https://market.ekfgroup.com/uploads/products/EA020A590357550176BDF5E49D098A2A.pdf",
        },
        {
            id: 7,
            name: "Промо-материалы",
            format: "PPTX",
            size: "24.5 МБ",
            link: "https://market.ekfgroup.com/uploads/products/536A80D88363637EF1F165AB63C548EF.pptx",
        },
        {
            id: 8,
            name: "Сертификат",
            format: "PDF",
            size: "1.9 МБ",
            link: "https://market.ekfgroup.com/uploads/products/022C116FAFAB3B8FF28801792CA70B61.pdf",
        },
        {
            id: 9,
            name: "Чертеж",
            format: "PDF",
            size: "1.1 МБ",
            link: "https://market.ekfgroup.com/uploads/products/34C87FAFC382E8CBBBA2A956C6255305.pdf",
        },
        {
            id: 10,
            name: "Чертеж",
            format: "DWG",
            size: "3.2 МБ",
            link: "https://market.ekfgroup.com/uploads/products/CA7B1DBED2E9F33DE1ABCBAF3710074C.DWG",
        },
    ];

    return (
        <div className="py-6">
            <h2 className="text-xl font-bold mb-4">Документация</h2>
            <div className="space-y-4">
                {documents.map(doc => (
                    <div key={doc.id} className="flex items-center">
                        <div className="mr-3 text-red-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                        </div>
                        <div className="flex-1">
                            <a
                                href={doc.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red hover:underline"
                            >
                                {doc.name} ({doc.format}, {doc.size})
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
