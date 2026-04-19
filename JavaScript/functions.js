export function getCat(id, categoryList) {
    for (const category of categoryList)
        if (category.getAttribute("id") === id) {
                return category.textContent
        }
}

export function getID(name, categoryList) { 
    for (const category of categoryList) {
        if(name.toLowerCase() === category.textContent.toLowerCase()) {
            return category.getAttribute("id")
        }
    }
    return "all"
}

export function createProductElement(product, template, selectors, catList) {
    let newEl = template.cloneNode(true)
    const name = product.querySelector("name").textContent;
    const price = product.querySelector("price").textContent;
    const photo = product.querySelector("photo").textContent;
    const categoryId = product.querySelector("categoryId").textContent;
    newEl.querySelector(selectors.name).textContent = name
    newEl.querySelector(selectors.price).textContent = price
    newEl.querySelector(selectors.photo).src = photo
    newEl.querySelector(selectors.category).textContent = getCat(categoryId,catList)
    newEl.dataset.id = product.getAttribute("id")
    if (selectors.description) {
        const desc = product.querySelector("description").textContent
        newEl.querySelector(selectors.description).textContent = desc
    }
    return newEl
}