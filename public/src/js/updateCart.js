let hasToy = document.querySelector(".upToyCart")
let hasWatch = document.querySelector(".upWatchCart")
let hasFood = document.querySelector(".upFoodCart")
let hasClothes = document.querySelector(".upClothesCart")


//If the shopping cart HAS the item, an event listener will be added to its input value so we can update the quantity. Need this conditional or it will error and subsequent events won't be handled properly
if (hasToy) hasToy.addEventListener("click", () => updateCartAgain(".toyQ", "Toy"))
if (hasWatch) hasWatch.addEventListener("click", () => updateCartAgain(".watchQ", "Watch"))
if (hasFood) hasFood.addEventListener("click", () => updateCartAgain(".foodQ", "Food"))
if (hasClothes) hasClothes.addEventListener("click", () => updateCartAgain(".clothesQ", "Clothes"))



async function updateCartAgain(item, name){
    let quantity = document.querySelector(item).value
    try{
        const res = await fetch ("/updateItem", {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "itemName" : name,
                "itemQty" : quantity
            })
        })
        location.assign("/cart")

    }
    catch(err){
        console.log(err)
    }
}