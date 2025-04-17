import CatalogUI from "./CatalogUI";
import dataCategory from "../../app/data/categories.json";
import dataProizvodstvo from "../../app/data/proizvodstvo.json";

export default function Category() {
    const { categories } = dataCategory;
    const { categories: proizvodstvo } = dataProizvodstvo;
    return (
        <>
            <CatalogUI
                categories={proizvodstvo}
                text="Производство металлокорпусов"
                key="proizvodstvo"
            />
            <CatalogUI
                categories={categories}
                text="Сборка щитов"
                key="categories"
            />
        </>
    );
}
