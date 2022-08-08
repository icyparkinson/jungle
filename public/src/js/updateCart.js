let allButtons = document.querySelectorAll(".upCart")
for (let button of allButtons){
    button.addEventListener("click", upCart)
}

async function upCart(){
    let itemName = this.parentNode.childNodes[1].innerText
    let quantity = this.parentNode.childNodes[3].firstElementChild.value

    try{
        const res = await fetch ("/updateItem", {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "itemName" : itemName,
                "itemQty" : quantity
            })
        })
        location.assign("/cart")

    }
    catch(err){
        console.log(err)
    }
    
    
}