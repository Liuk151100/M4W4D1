const containerDetails = document.querySelector("#container-details")

const urlParams = new URLSearchParams(window.location.search);
//prendo il parametro dall'URL
const parametro = urlParams.get('id');

fetchProduct()
async function fetchProduct() {
    try {
        const result = await fetch(`https://striveschool-api.herokuapp.com/api/product/${parametro}`, {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVmOTU3YzIzZGQwMjAwMTUxZGM0ZmIiLCJpYXQiOjE3NTEwOTQ2NTIsImV4cCI6MTc1MjMwNDI1Mn0.rrVjarck49W1zlK6qZ0QG0mO9nza4D_gV9gaKxoQXb0",
            },
        })
        const data = await result.json()
        console.log(data)
        creaPagDettaglio(data)
    } catch (e) {
        console.log(e)
    }
}


function creaPagDettaglio(product){

    const divFlex = document.createElement("div")
    divFlex.style = "width:100%; display:flex; margin:20px"

    const img = document.createElement("img")
    img.src = product.imageUrl

    const div = document.createElement("div")

    const cardTitle1 = document.createElement("h5")
    cardTitle1.classList.add("card-title")
    cardTitle1.innerText = product.brand

    const cardTitle2 = document.createElement("h4")
    cardTitle2.classList.add("card-title")
    cardTitle2.innerText = product.name

    const cardText = document.createElement("p")
    cardText.classList.add("card-text")
    cardText.innerText = `${product.price}€`

    const description = document.createElement("p")
    cardTitle2.innerText = product.description

    div.append(cardTitle1,cardTitle2,cardText,description)
    divFlex.append(img,div)
    
    containerDetails.append(divFlex)

}

function vaiAllaHome() {
    window.location.href = "Home.html"
}

