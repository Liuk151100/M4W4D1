const tableBody = document.querySelector("#tableBody")
const nameProduct = document.querySelector("#name")
const descriptionProduct = document.querySelector("#description")
const brandProduct = document.querySelector("#brand")
const imageProduct = document.querySelector("#imageUrl")
const priceProduct = document.querySelector("#price")
const hiddenInput = document.querySelector("#hiddenInput")
const successAlert = document.querySelector("#successAlert")
const errorAlert = document.querySelector("#errorAlert")
document.querySelector("#saveButton").addEventListener("click", saveProduct)

fetchProduct()
async function fetchProduct() {
    try {
        const result = await fetch("https://striveschool-api.herokuapp.com/api/product", {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVmOTU3YzIzZGQwMjAwMTUxZGM0ZmIiLCJpYXQiOjE3NTEwOTQ2NTIsImV4cCI6MTc1MjMwNDI1Mn0.rrVjarck49W1zlK6qZ0QG0mO9nza4D_gV9gaKxoQXb0",
            },
        })
        const data = await result.json()
        console.log(data)
        mappingProduct(data)
    } catch (e) {
        console.log(e)
    }
}

function mappingProduct(products) {
    tableBody.innerHTML = ""
    const productTr = products.map((product) =>
        createTableRaw(product)
    )
    console.log(productTr)
    tableBody.append(...productTr)
}

function createTableRaw(product) {
    const tr = document.createElement("tr")

    const name = document.createElement("td")
    name.innerText = product.name

    const brand = document.createElement("td")
    brand.innerText = product.brand

    const image = document.createElement("td")
    image.innerText = product.imageUrl

    const price = document.createElement("td")
    price.innerText = product.price

    const actions = document.createElement("td")
    const editBtn = document.createElement("a")
    editBtn.classList.add("btn", "btn-primary", "w-100", "mb-3")
    editBtn.innerText = "EDIT"
    //editBtn.addEventListener("click", () => productInputs(product))
    editBtn.href = `editProduct.html?id=${product._id}`
    actions.appendChild(editBtn)
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("btn", "btn-danger", "w-100")
    deleteBtn.innerText = "CANC"
    deleteBtn.addEventListener("click", () => deleteProduct(product._id))
    actions.appendChild(deleteBtn)

    tr.append(name, brand, image, price, actions)

    return tr
}

async function saveProduct(e) {
    e.preventDefault()
    const data = {
        name: nameProduct.value,
        description: descriptionProduct.value,
        brand: brandProduct.value,
        imageUrl: imageProduct.value,
        price: priceProduct.value
    }
    console.log(data)
    let method = "POST"
    let endpoint = "https://striveschool-api.herokuapp.com/api/product"
    if (hiddenInput.value) {
        method = "PUT"
        endpoint += hiddenInput.value
    }
    try {
        await fetch(endpoint, {
            //In questo caso viene presa in automatico la variabile method, istanziata qui sopra
            method, //equivale a method: method (variabile sopra istanziata)
            body: JSON.stringify(data),
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVmOTU3YzIzZGQwMjAwMTUxZGM0ZmIiLCJpYXQiOjE3NTEwOTQ2NTIsImV4cCI6MTc1MjMwNDI1Mn0.rrVjarck49W1zlK6qZ0QG0mO9nza4D_gV9gaKxoQXb0",
                "Content-Type": "application/json",
            },
        })
        fetchProduct()
        successAlert.classList.remove("d-none")
        nameProduct.value = ""
        descriptionProduct.value = ""
        brandProduct.value = ""
        imageProduct.value = ""
        priceProduct.value = ""
        setTimeout(() => {
            successAlert.classList.add("d-none")
        }, 2000)

    } catch (e) {
        errorAlert.classList.remove("d-none")
        console.log(e)
    }
}

async function deleteProduct(productId) {
    try {
        await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVmOTU3YzIzZGQwMjAwMTUxZGM0ZmIiLCJpYXQiOjE3NTEwOTQ2NTIsImV4cCI6MTc1MjMwNDI1Mn0.rrVjarck49W1zlK6qZ0QG0mO9nza4D_gV9gaKxoQXb0",
            },
        })
        fetchProduct()
    } catch (e) {
        console.log(e)
    }
}

function productInputs(product) {
    nameProduct.value = product.name
    descriptionProduct.value = product.description
    brandProduct.value = product.brand
    imageProduct.value = product.imageUrl
    priceProduct.value = product.price
    hiddenInput.value = product._id
}

function vaiAllaHome(){
    //windows.open ti permette di aprire una pagina in un altra finestra del browser
    window.location.href = "Home.html"
}