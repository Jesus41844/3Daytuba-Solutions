//functions that close and open navigation bar

const closeMenu = document.getElementById("close-menu")
const showMenu = document.getElementById("show-menu")
let menuLinks = document.getElementById("menu-links")


showMenu.addEventListener("click", function(){
    menuLinks.style.left = "0"
})

closeMenu.addEventListener("click", function(){
    menuLinks.style.left = "100%"
})

