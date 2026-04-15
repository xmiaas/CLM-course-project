const template = document.createElement("div")
template.innerHTML = `
<div class="product-template">
          <img src = "" class="product-img">
          <div class = "product__info">
          <p class="product-name"></p>
          <p class="cat"></p>
          </div>
          <p class="product-price"></p>
    </div>
    `



let searchMenuIcon = document.getElementById("searchHeader")
let searchMenu = document.querySelector(".search")
let closeIcon = document.getElementById("close-search")

searchMenuIcon.addEventListener("click", () => {
    document.getElementById("search-blur").style.display="block"
    searchMenu.classList.toggle('search__active');
    searchMenu.querySelector('input').focus();
    
})

closeIcon.addEventListener("click", () => {
    document.getElementById("search-blur").style.display="none"
    searchMenu.classList.toggle('search__active')
})

fetch("xml/products.xml")
    .then(response => response.text())
    .then(
        result => {
            const domParser = new DOMParser()
            const xmlDoc = domParser.parseFromString(result, "text/xml")
            const lst = xmlDoc.querySelectorAll("product")
            const categoryList = xmlDoc.querySelectorAll("category")

            const inpEl = document.querySelector("#src-input")
            const ElementToInsert = document.getElementById("element-to-insert")

            function getCat(id) {
                for (const category of categoryList)
                    if (category.getAttribute("id") === id) {
                        return category.textContent
                    }
            }
            
            inpEl.addEventListener('input', (event) => {
                let inputVal = event.target.value.toLowerCase()
                ElementToInsert.innerHTML = ""
                let found = false; 
                for (const product of lst) {
                    const productName = product.querySelector("name").textContent.toLowerCase()

                    if (inputVal === "") return;
                    if (productName.includes(inputVal)){
                        found = true;
                        const newElement = template.querySelector(".product-template").cloneNode(true)
                        const name = newElement.querySelector(".product-name")
                        const price = newElement.querySelector(".product-price")
                        const imgSrc = newElement.querySelector(".product-img") 
                        const category = newElement.querySelector(".cat")


                        name.textContent = product.querySelector("name").textContent
                        price.textContent = product.querySelector("price").textContent
                        imgSrc.src = product.querySelector("photo").textContent

                        const categoryId = product.querySelector("categoryId").textContent
                        category.textContent = getCat(categoryId)
                        
                        
                        ElementToInsert.append(newElement)
                    }
                }
                if (!found) { 
                    ElementToInsert.innerHTML = "<p id='notFound'>Товар не найден</p>";
                }
            })

        }
    )