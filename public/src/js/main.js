let item = document.querySelector("#item").innerText
let price = document.querySelector(".dealPrice").innerText.split("$")[1]

document.querySelector(".addToCart").addEventListener("click", addCart)


async function addCart(){
    let quantity = document.getElementById("quantity").value
    try{
        const res = await fetch ("/addItem", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "itemName" : item,
                "itemCount" : quantity,
                "itemPrice" : parseInt(price)
            })
        })
        console.log(item, quantity)
        window.location.reload(true)

    }
    catch(err){
        console.log(err)
    }
}