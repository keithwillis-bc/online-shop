const addToCartButton = document.querySelector("#product-details button");
const cartBadge = document.querySelector(".nav-items .badge");

addToCartButton.addEventListener("click", async () => {
  const productId = addToCartButton.dataset.productid;
  const csrfToken = addToCartButton.dataset.csrf;
  let response;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("something went wrong");
    return;
  }

  if (!response.ok) {
    alert("something went wrong");
  }

  const responseData = await response.json();

  const newTotalQuantity = responseData.newTotalItems;
  cartBadge.textContent = newTotalQuantity;
});
