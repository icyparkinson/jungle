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
    