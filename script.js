async function fetchPrintfulProducts() {
    try {
        console.log("Fetching Printful products...");

        const response = await fetch('/.netlify/functions/getPrintfulProducts');
        const data = await response.json();

        console.log("Received Data:", data);

        if (data.error) {
            console.error("Error fetching Printful products:", data.error);
            return;
        }

        const productContainer = document.getElementById("product-list");
        productContainer.innerHTML = ""; // Clear previous content

        data.forEach(product => {
            console.log("Processing Product:", product);

            const productElement = document.createElement("div");
            productElement.classList.add("product-item");
            productElement.innerHTML = `
                <img src="${product.thumbnail_url}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Price: $${product.retail_price}</p>
                <a href="${product.checkout_link}" target="_blank" rel="noopener noreferrer">Buy Now</a>
            `;
            productContainer.appendChild(productElement);
        });

    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
}

// Run function when page loads
if (window.location.pathname.includes("product.html")) {
    document.addEventListener("DOMContentLoaded", fetchPrintfulProducts);
}
