let item = document.querySelector("#item").innerText
let price = document.querySelector(".dealPrice").innerText.split("$")[1]

document.querySelector(".addToCart").addEventListener("click", addCart)
document.querySelector(".updateCart").addEventListener("click", updateCart)
let img = document.querySelector(".bigPic").src

console.log()

async function addCart(){
    let quantity = document.getElementById("quantity").value
    try{
        const res = await fetch ("/addItem", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "itemName" : item,
                "itemCount" : quantity,
                "itemPrice" : price,
                "itemPic" : img
            })
        })
        console.log(item, price)
        location.assign("/cart")

    }
    catch(err){
        console.log(err)
    }
}

async function updateCart(){
    let quantity = document.getElementById("quantity").value
    try{
        const res = await fetch ("/updateItem", {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "itemName" : item,
                "itemQty" : quantity
            })
        })
        location.assign("/cart")

    }
    catch(err){
        console.log(err)
    }
    console.log("clicked!")
}
