document.addEventListener("DOMContentLoaded", () => {
    console.log("Goley Bhai Timber website loaded successfully.");

    // Check Backend Health
    fetch("http://localhost:3000/health")
        .then(response => response.json())
        .then(data => {
            console.log("Backend Connection Status:", data.status);
        })
        .catch(error => {
            console.error("Could not connect to backend:", error);
        });

    // Fetch and Display Products Dynamically
    fetchProducts();
});

function fetchProducts() {
    fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .then(products => {
            console.log("Products received from API:", products);
            
            const grid = document.querySelector(".products-grid");
            if (!grid) return;

            // Clear static HTML content
            grid.innerHTML = "";

            // Render dynamic product cards
            products.forEach(product => {
                const card = document.createElement("div");
                card.className = "product-card";
                card.innerHTML = `
                    <div class="product-icon">${product.icon}</div>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                `;
                grid.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
}