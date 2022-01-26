const deleteButtons = document.querySelectorAll(".product-item button");

async function deleteProduct(event){
    const button = event.target;
    const productId = button.dataset.productid;
    const csrf = button.dataset.csrf;

    const response = await fetch('/admin/products/'+ productId + "?_csrf=" + csrf, {
        method: "DELETE"
    });

    if(!response.ok){
      alert("something went wrong");
      return;
    }
    
    //remove item from screen
    button.parentElement.parentElement.parentElement.parentElement.remove();
}

for(const deleteButton of deleteButtons){
    deleteButton.addEventListener('click', deleteProduct);
}