exports.handler = async function () {
    try {
        const response = await fetch("https://api.printful.com/store/products", {
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

        return {
            statusCode: 200,
            body: JSON.stringify(data.result),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
