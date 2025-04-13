//functions that close and open navigation bar

const closeMenuButton = document.getElementById("close-menu")
const showMenuButton = document.getElementById("show-menu")
let menuLinks = document.getElementById("menu-links")


showMenuButton.addEventListener("click", function(){
    menuLinks.style.left = "0"
})

closeMenuButton.addEventListener("click", function(){
    menuLinks.style.left = "100%"
})

