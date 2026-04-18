

//Боковоая панель с категориями 
const liTagTemplate = document.createElement("li")
const cartProductTemplate = document.createElement("div")
cartProductTemplate.innerHTML = `<div class="product-cart">
            <div class="product-cart__img">
              <img src="" />
            </div>
            <div class="product-cart__info">
              <p class="product-category"></p>
              <p class="product-name"></p>
              <p class="product-price"></p>
            </div>
          </div>`
const categoryListHtml = document.querySelector(".cat_list")
const productConteiner = document.querySelector(".product-container")


fetch("xml/products.xml")
    .then(response => response.text())
    .then(
        result => 
        {
            const domParser = new DOMParser()
            const xmlDoc = domParser.parseFromString(result, "text/xml")
            const categoryList = xmlDoc.querySelectorAll("category")

            //бок меню
            for (const cat of categoryList) {
                const liTagClone = liTagTemplate.cloneNode()
                liTagClone.textContent = cat.textContent
                categoryListHtml.append(liTagClone)
            }

            //карточки
            const cart = cartProductTemplate.querySelector(".product-cart")
            const productList = xmlDoc.querySelectorAll("product")
        
            for (let product of productList) { // Добавьте let для переменной цикла
                let newElement = cart.cloneNode(true);
                
                // ПРАВИЛЬНО: Присваиваем свойству textContent
                newElement.querySelector(".product-name").textContent = product.querySelector("name").textContent;
                newElement.querySelector(".product-price").textContent = product.querySelector("price").textContent;
                newElement.querySelector("img").src = product.querySelector("photo").textContent;

                let catId = product.querySelector("categoryId").textContent;
                
                
                newElement.querySelector(".product-category").textContent = getCat(catId, categoryList);

                // ПРАВИЛЬНО: Используем append вместо add
                productConteiner.append(newElement);
}
        }
    )

    
categoryListHtml.addEventListener("click", (event) => {
        const targetLi = event.target.closest("li");
        if (!targetLi) return;
        const currentActive = categoryListHtml.querySelector(".li-active");

        if (currentActive && currentActive !== targetLi) {
            currentActive.classList.remove("li-active");
        }

        targetLi.classList.add("li-active");
});


productConteiner.addEventListener("mouseover", (event) => {
    const card = event.target.closest(".product-cart")
    card.querySelector("img").classList.add("img-active")
    })

productConteiner.addEventListener("mouseout", (event) => {
    const card = event.target.closest(".product-cart")
    card.querySelector("img").classList.remove("img-active")
})