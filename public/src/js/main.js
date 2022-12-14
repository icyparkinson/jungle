// SEARCHBAR FUNCTION

let searchBtn = document.querySelector(".searchBtn")
let searchBar = document.querySelector(".search")
let dest = ""

window.onload = function() {
    searchBar.value = '';
    }

searchBar.addEventListener("keyup", loadPage)


function loadPage(e){
    e.preventDefault()
    if (e.key === 'Enter'){
        let content = searchBar.value.toLowerCase()
        switch (content){
            case "toy" : 
                dest = "62e726b7da400130d185a46b"
                break
            case "watch" :
                dest = "62ec4820d159dab74abf793a"
                break
            case "food" : 
                dest = "62ec50a5d159dab74abf793b"
                break
            case "clothes" : 
                dest = "62ec50eed159dab74abf793c"
                break
        }
        if (dest.length >0){
            window.location.assign(`/items/${dest}`)
            dest = ""  //Need this line to reset dest so that when you return to this page, a new search can be done
        }else{
            window.location.assign("/nothing")
            dest=""
        }
    } 
}



//Put everything inside an if statement for the existence of item in the DOM so it doesn't error on the homepage
//ITEMS PAGE

if (document.querySelector("#item")){

    let item = document.querySelector("#item").innerText
    let price = document.querySelector(".dealPrice").innerText.split("$")[1]
    let img = document.querySelector(".bigPic").src
    let page = window.location.href

    document.querySelector(".addToCart").addEventListener("click", addCart)
    document.querySelector(".updateCart").addEventListener("click", updateCart)
    

    //ADD TO CART FROM ITEMS PAGE
    async function addCart(){
        let quantity = document.getElementById("quantity").value
        if (quantity !== "0"){
            try{
                const res = await fetch ("/addItem", {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        "itemName" : item,
                        "itemCount" : quantity,
                        "itemPrice" : price,
                        "itemPic" : img,
                        "itemPage" : page
                    })
                })
                location.assign("/cart")
    
            }
            catch(err){
                console.log(err)
            }
        }
        
    }

    //UPDATE CART FROM ITEMS PAGE
    let startQty = document.getElementById("quantity").value
    async function updateCart(){
        let quantity = document.getElementById("quantity").value
        if (startQty !== quantity){
            if (quantity === "0"){
                let check = confirm("Are you sure you want to remove this item from your shopping cart?")
                if (check == true){
                    try{
                        let res = await fetch("/deleteItem", {
                            method: "DELETE",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                            "itemName" : item,
                            })
                        })
        
        
                    } catch(err){
                        console.log(err)
                    }
                }
                window.location.reload(true)
            }else{
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
            }
        }
    }
}
    

//CARTS PAGE

//Another if statement to hold another set of instructions




if (document.querySelectorAll(".upCart")){

    let itemName = document.querySelector(".itemH2").innerText

    let allButtons = document.querySelectorAll(".upCart")
    for (let button of allButtons){
        button.addEventListener("click", upCart)
    }

    //UPDATE QUANTITY FOR CARTS PAGE
    let startQty = document.querySelector("#quantity").value
    async function upCart(){
        //quantityVal grabs the value in the input field
        let quantityVal = quantity.value

        //only trigger if the user actually changes the value from whatever the page loaded on (original qty in cart)
        if (startQty !== quantityVal){
            //if the new number is 0, prompt user to delete the item completely and then refresh the page
            if (quantityVal === "0"){
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
            
            //if the new number is any other value, we will just update the qty of this item and refresh the page
            }else{
                try{
                    const res = await fetch ("/updateItem", {
                        method: "PUT",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            "itemName" : itemName,
                            "itemQty" : quantityVal
                        })
                    })
                    location.assign("/cart")
                }
                catch(err){
                    console.log(err)
                }
            }
            
        }
    }

    //DELETE ONE ITEM ON CARTS PAGE
    let allDelete = document.querySelectorAll(".delete")
    for (let del of allDelete){
        del.addEventListener("click", deleteItem)
    }

    async function deleteItem(){

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

    //EMPTY CART ON CARTS PAGE
    if (document.querySelector(".emptyCart")){
        document.querySelector(".emptyCart").addEventListener("click", deleteAllItems)

        async function deleteAllItems(){
            let check = confirm("Are you sure you want to empty your shopping cart?")
            if (check == true){
                try{
                    let res = await fetch("/emptyCart", {
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
    }
    
}

