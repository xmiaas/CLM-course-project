import "./main.js"
import { getCat, createProductElement, getID } from "./functions.js"
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
const selectors = {
                    name: ".product-name",
                    price: ".product-price",
                    photo: "img",
                    category: ".product-category"
                }


const categoryListHtml = document.querySelector(".cat_list")
const productConteiner = document.querySelector(".product-container")


const displayProduct = (productList, categoryList, currentID="all") => {
    productConteiner.innerHTML = ""

    for (let product of productList) { 
        if (currentID === "all" || currentID === product.querySelector("categoryId").textContent) {
            let newEl = createProductElement(product,cartProductTemplate,selectors,categoryList)
              productConteiner.append(newEl)
        }
                    
}
}

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
            displayProduct(productList, categoryList)


            categoryListHtml.addEventListener("click", (event) => {
                //смена цвета при нажатии
                const targetLi = event.target.closest("li");
                if (!targetLi) return;
                const currentActive = categoryListHtml.querySelector(".li-active");

                if (currentActive && currentActive !== targetLi) {
                    currentActive.classList.remove("li-active");
                }

                targetLi.classList.add("li-active");
                
                //вырисовка
                let currentID = getID(targetLi.textContent, categoryList)
                displayProduct(productList,categoryList, currentID)

        });
            
            
        }
    )

    



productConteiner.addEventListener("mouseover", (event) => {
    const card = event.target.closest(".product-cart")
    card.querySelector("img").classList.add("img-active")
    })

productConteiner.addEventListener("mouseout", (event) => {
    const card = event.target.closest(".product-cart")
    card.querySelector("img").classList.remove("img-active")
})