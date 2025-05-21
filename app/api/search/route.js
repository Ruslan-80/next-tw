import { searchProducts } from "../../(main)/search/actions";

export async function POST(request) {
    try {
        const { query } = await request.json();

        if (!query) {
            return Response.json([], { status: 400 });
        }
        const products = await searchProducts(query);

        return Response.json(products);
    } catch (error) {
        console.error("API search error:", error);
        return Response.json([], { status: 500 });
    }
}
