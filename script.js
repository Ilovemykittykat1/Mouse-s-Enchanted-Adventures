async function fetchPrintfulProducts() {
    try {
        console.log("Fetching Printful products from Netlify function...");

        const response = await fetch('/.netlify/functions/getPrintfulProducts');
        const data = await response.json();

        console.log("Received Data:", data);

        const productContainer = document.getElementById("product-list");

        // Check if #product-list exists
        if (!productContainer) {
            console.warn("No 'product-list' container found. Make sure #product-list exists in product.html.");
            return;
        }

        // Clear previous content
        productContainer.innerHTML = "";

        // Ensure we have valid products
        if (!data || data.length === 0 || data.error) {
            console.error("No products found or error:", data.error || "Empty response");
            productContainer.innerHTML = "<p>No products available.</p>";
            return;
        }

        // Loop through products and add them to the page
        data.forEach(product => {
            console.log("Processing Product:", product);

            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <h2>${product.name}</h2>
                <p>Price: $${product.retail_price}</p>
                <img src="${product.thumbnail_url}" alt="${product.name}" style="max-width: 100%; border-radius: 5px;">
                <a href="${product.checkout_link}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; background-color: red; color: white; text-decoration: none; border-radius: 5px;">Buy Now</a>
            `;
            productContainer.appendChild(productElement);
        });

    } catch (error) {
        console.error("Failed to fetch products:", error);
        document.getElementById("product-list").innerHTML = "<p>Error loading products.</p>";
    }
}

// ✅ Only run on `product.html`
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("product.html")) {
        console.log("Running fetchPrintfulProducts on product.html...");
        fetchPrintfulProducts();
    } else {
        console.log("Not on product.html, skipping fetchPrintfulProducts.");
    }
});
