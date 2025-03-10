exports.handler = async function () {
    try {
        // Fetch products with variants included
        const response = await fetch("https://api.printful.com/store/products?include=variants", {
            headers: {
                "Authorization": `Bearer ${process.env.PRINTFUL_API_TOKEN}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: data.error || "Failed to fetch Printful products" }),
            };
        }

        // Extract necessary product details
        const products = data.result.map(product => ({
            id: product.id,
            name: product.name,
            thumbnail_url: product.thumbnail_url,
            retail_price: product.variants?.[0]?.retail_price || "N/A",
            checkout_link: product.variants?.[0]
                ? `https://www.printful.com/cart/add?product_variant=${product.variants[0].id}`
                : "#"
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(products),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
