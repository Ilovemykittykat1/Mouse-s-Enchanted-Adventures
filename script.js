async function fetchPrintfulProducts() {
  try {
    const response = await fetch('/.netlify/functions/getPrintfulProducts');
    const data = await response.json();

    if (data.error) {
      console.error("Error fetching Printful products:", data.error);
      return;
    }

    const productContainer = document.querySelector(".product-grid");
    productContainer.innerHTML = ""; // Clear previous content

    data.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");

      productElement.innerHTML = `
        <h2>${product.name}</h2>
        <p>Price: $${product.retail_price}</p>
        <img src="${product.thumbnail_url}" alt="${product.name}">
        <a href="${product.url}" target="_blank">Buy Now</a>
      `;

      productContainer.appendChild(productElement);
    });

  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}

// Run functions when page loads
if (
  window.location.pathname.endsWith("product.html") ||
  window.location.pathname.endsWith("/product")
) {
  document.addEventListener("DOMContentLoaded", () => {
    // Load Printful products
    fetchPrintfulProducts();

    // Run Mouse attack sprite animation
    const canvas = document.getElementById("mouseAttackCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const spriteSheet = new Image();
    spriteSheet.src = "images/mouse-attack-sprites.png";

    const FRAME_WIDTH = 512;
    const FRAME_HEIGHT = 512;
    const totalFrames = 4;
    let currentFrame = 0;

    spriteSheet.onload = () => {
      setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const sx = (currentFrame % 2) * FRAME_WIDTH;
        const sy = Math.floor(currentFrame / 2) * FRAME_HEIGHT;

        ctx.drawImage(
          spriteSheet,
          sx, sy, FRAME_WIDTH, FRAME_HEIGHT,
          0, 0, FRAME_WIDTH, FRAME_HEIGHT
        );

        currentFrame = (currentFrame + 1) % totalFrames;
      }, 300);
    };
  });
}
