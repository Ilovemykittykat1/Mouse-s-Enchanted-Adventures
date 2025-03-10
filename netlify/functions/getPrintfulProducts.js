exports.handler = async function () {
    try {
        console.log("Fetching Printful products...");

        // Fetch Printful products with variants
        const response = await fetch("https://api.printful.com/store/products?include=variants", {
            headers: {
                "Authorization": `Bearer ${process.env.PRINTFUL_API_TOKEN}`
            }
        });

        const data = await response.json();
        console.log("API Response:", JSON.stringify(data, null, 2));

        if (!response.ok) {
            console.error("Error fetching Printful products:", data.error);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: data.error || "Failed to fetch Printful products" }),
            };
        }

        if (!data.result || data.result.length === 0) {
            console.warn("No products found in API response");
            return {
                statusCode: 200,
                body: JSON.stringify([]), // Return an empty array instead of error
            };
        }

        // Extract necessary product details
        const products = data.result.map(product => {
            const firstVariant = product.variants?.[0]; // Get first variant

            return {
                id: product.id,
                name: product.name || "Unnamed Product",
                thumbnail_url: product.thumbnail_url || "",
                retail_price: firstVariant?.retail_price || "N/A",
                checkout_link: firstVariant
                    ? `https://www.printful.com/customize/${firstVariant.id}`
                    : "#" // Fallback if no valid variant
            };
        });

        console.log("Processed Products:", JSON.stringify(products, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify(products),
        };

    } catch (error) {
        console.error("Function Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
