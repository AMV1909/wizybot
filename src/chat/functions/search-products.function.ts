import fs from "fs";
import csv from "csv-parser";
import path from "path";

/**
 * Interface representing a product in the search results
 */
interface Product {
    displayTitle: string;
    embeddingText: string;
    url: string;
    imageUrl: string;
    productType: number;
    discount: number;
    price: string;
    variants: string;
    createDate: string;
}

/**
 * Interface representing the response from the product search
 */
interface SearchResponse {
    products: Product[];
    total: number;
}

/**
 * Searches for products based on a query string
 * This is a mock implementation that returns simulated product data
 *
 * @param query - The search query string
 * @returns Promise<SearchResponse> - Object containing matching products and total count
 */
export async function searchProducts(query: string): Promise<SearchResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock product database
    const filePath = path.resolve(__dirname, "../../../products/products.csv");
    const products: Product[] = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (data) => products.push(data as Product))
            .on("end", () => {
                const normalizedQuery = query.toLowerCase();

                const scored = products.map((product) => {
                    const score =
                        (product.displayTitle
                            ?.toLowerCase()
                            .includes(normalizedQuery)
                            ? 1
                            : 0) +
                        (product.embeddingText
                            ?.toLowerCase()
                            .includes(normalizedQuery)
                            ? 1
                            : 0);
                    return { product, score };
                });

                const sorted = scored
                    .sort((a, b) => b.score - a.score)
                    .filter((entry) => entry.score > 0)
                    .map((entry) => entry.product);

                // Return search results
                resolve({
                    products: sorted.slice(0, 2), // Return only 2 products
                    total: sorted.length,
                });
            })
            .on("error", (err) => reject(err));
    });
}
