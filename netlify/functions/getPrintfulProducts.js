exports.handler = async function () {
    try {
        console.log("Fetching Printful products...");

        // Fetch product list including variants
        const response = await fetch("https://api.printful.com/store/products?include=variants", {
            headers: {
                "Authorization": `Bearer ${process.env.PRINTFUL_API_TOKEN}`
            }
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (!response.ok) {
            console.error("Error fetching Printful products:", data.error);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: data.error || "Failed to fetch Printful products" }),
            };
        }

        // Process and return only necessary data
        const products = data.result.map(product => {
            const firstVariant = product.variants?.[0]; // Get first variant

            return {
                id: product.id,
                name: product.name,
                thumbnail_url: product.thumbnail_url || "",
                retail_price: firstVariant?.retail_price || "N/A",
                checkout_link: firstVariant
                    ? `https://www.printful.com/customize/${firstVariant.id}`
                    : "#" // Fallback if no valid variant
            };
        });

        console.log("Processed Products:", products);

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
