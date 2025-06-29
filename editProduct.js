const nameProduct = document.querySelector("#name")
const descriptionProduct = document.querySelector("#description")
const brandProduct = document.querySelector("#brand")
const imageProduct = document.querySelector("#imageUrl")
const priceProduct = document.querySelector("#price")
document.querySelector("#saveButton").addEventListener("click", saveProduct)

const search = window.location.search
const searchProduct = new URLSearchParams(search)
const productId = searchProduct.get("id")
const successAlert = document.querySelector("#successAlert")
const errorAlert = document.querySelector("#errorAlert")

getProduct()
async function getProduct() {
    try {
        const result = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVmOTU3YzIzZGQwMjAwMTUxZGM0ZmIiLCJpYXQiOjE3NTEwOTQ2NTIsImV4cCI6MTc1MjMwNDI1Mn0.rrVjarck49W1zlK6qZ0QG0mO9nza4D_gV9gaKxoQXb0",
            },
        })

        const data = await result.json()
        console.log(data)
        productInputs(data)
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
    try {
        await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVmOTU3YzIzZGQwMjAwMTUxZGM0ZmIiLCJpYXQiOjE3NTEwOTQ2NTIsImV4cCI6MTc1MjMwNDI1Mn0.rrVjarck49W1zlK6qZ0QG0mO9nza4D_gV9gaKxoQXb0",
                "Content-Type": "application/json",
            },
        })
        successAlert.classList.remove("d-none")
        nameProduct.value = ""
        descriptionProduct.value = ""
        brandProduct.value = ""
        imageProduct.value = ""
        priceProduct.value = ""
        setTimeout(() => {
            window.location.href = "backOffice.html"
        }, 1000)

    } catch (e) {
        errorAlert.classList.remove("d-none")
        console.log(e)
    }
}