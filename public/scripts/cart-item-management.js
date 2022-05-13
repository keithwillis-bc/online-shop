const updateButtons = document.querySelectorAll(".cart-item-management button");
const cartItemUpdateFormElements = document.querySelectorAll(
  ".cart-item-management"
);
const cartBadge = document.querySelector(".nav-items .badge");
const totalPrice = document.querySelector("#cart-total p");

async function updateCartItem(event) {
  event.preventDefault();
  const form = event.target;
  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const itemPrice =
    form.parentElement.querySelector(".cart-item-info p").firstChild;
  const quantity = form.firstElementChild.value;
  alert(productId);
  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity.value,
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

  const newTotalQuantity = responseData.updatedCartData.newTotalQuantity;
  const newTotalPrice = responseData.updatedCartData.newTotalPrice;
  const updatedItemPrice = responseData.updatedCartData.updatedItemPrice;

  cartBadge.textContent = newTotalQuantity;
  totalPrice.textContent = `Total: $${newTotalPrice.toFixed(2)}`;
  itemPrice.textContent = `$${updatedItemPrice.toFixed(2)}`;

  if (updatedItemPrice === 0) {
    updateQuantityButton.parentElement.parentElement.remove();
  }
}

/*for (const button of updateButtons) {
  button.addEventListener("click", updateQuantity);
}*/

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
