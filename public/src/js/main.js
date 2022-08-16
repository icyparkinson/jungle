//Put everything inside an if statement for the existence of item in the DOM so it doesn't error on the homepage


if (document.querySelector("#item")){

    let item = document.querySelector("#item").innerText
    let price = document.querySelector(".dealPrice").innerText.split("$")[1]

    document.querySelector(".addToCart").addEventListener("click", addCart)
    document.querySelector(".updateCart").addEventListener("click", updateCart)
    let img = document.querySelector(".bigPic").src
    let page = window.location.href

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
                    "itemPic" : img,
                    "itemPage" : page
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

}
    
// SEARCHBAR FUNCTION
let searchBtn = document.querySelector(".searchBtn")
let searchBar = document.querySelector(".search")
let dest = ""

window.onload = function() {
    searchBar.value = '';
    }

searchBar.addEventListener("keyup", e => {
    e.preventDefault()
    if (e.key === 'Enter'){
        let content = searchBar.value
        switch (content){
            case "toy" : 
                dest = "items/62e726b7da400130d185a46b"
                break
            case "watch" :
                dest = "items/62ec4820d159dab74abf793a"
                break
            case "food" : 
                dest = "items/62ec50a5d159dab74abf793b"
                break
            case "clothes" : 
                dest = "items/62ec50eed159dab74abf793c"
                break
        }
        if (dest.length >0){
            window.location.assign(dest)
            dest = ""  //Need this line to reset dest so that when you return to this page, a new search can be done
        }else{
            window.location.assign("/nothing")
            dest=""
        }
    } 
})



// searchBtn.addEventListener("click", openPage)


// function openPage(){
//     let searchVal = searchBar.value.toLowerCase()
    // switch (searchVal){
    //     case "toy" : 
    //         dest = "/toy1"
    //         break
    //     case "watch" :
    //         dest = "/watch1"
    //         break
    //     case "food" : 
    //         dest = "/food1"
    //         break
    //     case "clothes" : 
    //         dest = "/clothes1"
    //         break
    // }
    // if (dest.length >0){
    //     window.location.assign(dest)
    // }else{
    //     window.location.assign("/nothing")
    // }
// }
