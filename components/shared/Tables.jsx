import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function UniversalTable({
    data,
    caption = "Data list",
    excludeKeys = [],
    customHeaders = {},
}) {
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    // Получаем все ключи из первого объекта
    const allKeys = Object.keys(data[0]);

    // Фильтруем ключи, которые нужно исключить
    const filteredKeys = allKeys.filter(key => !excludeKeys.includes(key));

    // Функция для форматирования заголовков
    const formatHeader = key => {
        if (customHeaders[key]) return customHeaders[key];
        return key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, str => str.toUpperCase())
            .trim();
    };

    return (
        <Table>
            <TableCaption>{caption}</TableCaption>
            <TableHeader>
                <TableRow>
                    {filteredKeys.map(key => (
                        <TableHead key={key}>{formatHeader(key)}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, index) => (
                    <TableRow key={index}>
                        {filteredKeys.map(key => (
                            <TableCell key={`${index}-${key}`}>
                                {typeof item[key] === "object"
                                    ? JSON.stringify(item[key])
                                    : item[key]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
