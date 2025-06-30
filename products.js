function vaiAllaHome() {
    window.location.href = "Home.html"
}

const div = document.querySelector(".row")

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
    div.innerHTML = ""
    const productCard = products.map((product) =>
        createCard(product)
    )
    div.append(...productCard)
}

function createCard(product) {
    /*
     <div class="col">
                <div class="card">
                    <img src="https://m.media-amazon.com/images/I/71se+LJZybL._AC_UL640_FMwebp_QL65_.jpg" class="card-img-top p-3" alt="">
                    <div class="card-body">
                        <h5 class="card-title">Apple</h5>
                        <h4 class="card-title">Macbook Pro 13"</h4>
                        <p class="card-text">3100€</p>
                        <a href="#" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>*/
    console.log(product)
    const divCol = document.createElement("div")
    divCol.classList.add("col")
    divCol.style = "height: auto; width:auto;"

    const divCard = document.createElement("div")
    divCard.classList.add("card")

    const imgCard = document.createElement("img")
    imgCard.classList.add("card-img-top", "p-3")
    imgCard.style = "height: 200px"
    imgCard.src = product.imageUrl

    const divCardBody = document.createElement("div")
    divCardBody.classList.add("card-body")

    const cardTitle1 = document.createElement("h5")
    cardTitle1.classList.add("card-title")
    cardTitle1.innerText = product.brand

    const cardTitle2 = document.createElement("h4")
    cardTitle2.classList.add("card-title")
    cardTitle2.innerText = product.name

    const cardText = document.createElement("p")
    cardText.classList.add("card-text")
    cardText.innerText = `${product.price}€`

    const linkBtn = document.createElement("a")
    linkBtn.classList.add("btn", "btn-primary")
    linkBtn.textContent = "View details"
    linkBtn.addEventListener("click", () => {
        window.location.href = `details.html?id=${product._id}`
    })

    divCardBody.append(cardTitle1, cardTitle2, cardText, linkBtn)
    divCard.append(imgCard, divCardBody)
    divCol.append(divCard)
    return divCol
}
