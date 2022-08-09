let hasToy = document.querySelector(".upToyCart")
let hasWatch = document.querySelector(".upWatchCart")
let hasFood = document.querySelector(".upFoodCart")
let hasClothes = document.querySelector(".upClothesCart")


//If the shopping cart HAS the item, an event listener will be added to its input value so we can update the quantity. Need this conditional or it will error and subsequent events won't be handled properly
if (hasToy) hasToy.addEventListener("click", () => updateCartAgain(".toyQ"))
if (hasWatch) hasWatch.addEventListener("click", () => updateCartAgain(".watchQ"))
if (hasFood) hasFood.addEventListener("click", () => updateCartAgain(".foodQ"))
if (hasClothes) hasClothes.addEventListener("click", () => updateCartAgain(".clothesQ"))



async function updateCartAgain(item){
    let quantity = document.querySelector(item).value
    try{
        const res = await fetch ("/updateItem", {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "itemCount" : quantity
            })
        })
        location.assign("/cart")

    }
    catch(err){
        console.log(err)
    }
    console.log(quantity)
}