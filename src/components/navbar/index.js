import home from "../../pages/home/index.js"


export const navbar = () =>{


  const sectionElement = document.createElement("navbar")
  sectionElement.setAttribute("class", "home-navbar")

  const navbarTemplate = `
  <button class="menu-mobile-btn" id="home-navbar"><img src="./img/home-navbar.png" class="menu-img"></button> 
  <button class="menu-mobile-btn" id="add-review-navbar"><img src="./img/add-navbar.png" class="menu-img"></button> 
  <button class="menu-mobile-btn" id="saved-navbar"><img src="./img/save-navbar.png" class="menu-img" id="save-navbar-img"></button>    
  <button class="menu-mobile-btn" id="profile-navbar"><img src="./img/profile-navbar.png" class="menu-img" ></button> 
  <button class="menu-mobile-btn" id="open-sidebar"><img src="./img/menu-navbar.png" class="menu-img" ></button>  
  `
  sectionElement.innerHTML = navbarTemplate

  const buttonHomeNavbar = sectionElement.querySelector("#home-navbar")
  buttonHomeNavbar.addEventListener("click", (e) => {
    e.preventDefault()
    window.history.pushState(null, null, "/home")
    const popStateEvent = new PopStateEvent("popstate", {
      state: {}
    })
    dispatchEvent(popStateEvent)
   
  })

  const buttonSaveNavbar = sectionElement.querySelector("#saved-navbar")

  buttonSaveNavbar.addEventListener("click", (e) => {
    e.preventDefault()
    window.history.pushState(null, null, "/salvos")
    const popStateEvent = new PopStateEvent("popstate", {
      state: {}
    })
    dispatchEvent(popStateEvent)
   
  })

  const buttonProfileNavbar = sectionElement.querySelector("#profile-navbar")

  buttonProfileNavbar.addEventListener("click", (e) => {
    e.preventDefault()
    window.history.pushState(null, null, "/perfil")
    const popStateEvent = new PopStateEvent("popstate", {
      state: {}
    })
    dispatchEvent(popStateEvent)
   
  })



 
  return sectionElement
}