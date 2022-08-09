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


let allDelete = document.querySelectorAll(".delete")
for (let del of allDelete){
    del.addEventListener("click", deleteItem)
}

async function deleteItem(){

    let itemName = this.parentNode.childNodes[1].innerText
    let check = confirm("Are you sure you want to remove this item from your shopping cart?")
    if (check == true){
        try{
            let res = await fetch("/deleteItem", {
                method: "DELETE",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                "itemName" : itemName,
                })
            })


        } catch(err){
            console.log(err)
        }
    }
    window.location.reload(true)

}