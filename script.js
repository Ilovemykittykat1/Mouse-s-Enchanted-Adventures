async function fetchPrintfulProducts() {
    try {
        const response = await fetch('/.netlify/functions/getPrintfulProducts');
        const data = await response.json();

        if (data.error) {
            console.error("Error fetching Printful products:", data.error);
            return;
        }

        const productContainer = document.getElementById("product-list");
        productContainer.innerHTML = ""; // Clear previous content

        data.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product-item");
            productElement.innerHTML = `
                <img src="${product.thumbnail_url}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Price: $${product.retail_price}</p>
                <a href="${product.url}" target="_blank">Buy Now</a>
            `;
            productContainer.appendChild(productElement);
        });

    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
}

// Run function when page loads
if (window.location.pathname.endsWith("product.html") || window.location.pathname.endsWith("/product")) {
    document.addEventListener("DOMContentLoaded", fetchPrintfulProducts);
}

