import { currentUser, getSavedReviews } from "../../lib/index.js"
import { sidebar } from "../../components/sidebar/index.js"
import { profileImage, loadPosts, showReviewArea } from "../../lib/functions-home.js"
import { navbar } from "../../components/navbar/index.js"
import home from "../home/index.js"


export default () => {

  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("class", "home-content")


  const savedTemplate = `
  <div class="home-container">
   
    <header >
      <p class="header-home">Bookish</p>
      <img class="favicon-home" src="img/favicon.png">
    </header>
  
    <div class="saved-items">
      <img  class="img-title-saved" src="./img/save.png">
      <p class="title-saved">SALVOS</p> 
      
    </div>
    
    <div data-all-reviews class= "all-reviews">
    
    </div>
    <div class="load">
    <div class="loading"></div>
  </div>
  `
  sectionElement.innerHTML = savedTemplate

  sectionElement.appendChild(sidebar())
  sectionElement.appendChild(navbar())

  sectionElement.querySelector(".save-sidebar").src = "../../img/home.png"
  sectionElement.querySelector(".save-sidebar").style.width = "2.5rem"
  sectionElement.querySelector("#save-sidebar-text").innerText = "Home"

  const homeBtnSidebar = sectionElement.querySelector("#saved-btn-sidebar")
  homeBtnSidebar.addEventListener("click", (e) => {
    e.preventDefault()
    window.history.pushState(null, null, "/home")
    const popStateEvent = new PopStateEvent("popstate", {
      state: {}
    })
    dispatchEvent(popStateEvent)

  })

  const openSidebar = sectionElement.querySelector("#open-sidebar")
  openSidebar.addEventListener("click", (e) => {
    e.preventDefault()
    const sidebar = sectionElement.querySelector("#sidebar")
    sidebar.style.display = "block"
    sidebar.classList.remove("sidebar-desktop")

  })



  const buttonHomeNavbar = sectionElement.querySelector("#home-navbar")
  buttonHomeNavbar.addEventListener("click", (e) => {
    e.preventDefault()
    window.history.pushState(null, null, "/home")
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

  const buttonAddReviewSidebar = sectionElement.querySelector("#add-review-sidebar")
  buttonAddReviewSidebar.addEventListener("click", (e) => {
    e.preventDefault()
    sectionElement.innerHTML = ""
    sectionElement.append(home())
    window.scrollTo(0, 0)
    showReviewArea()
    window.history.pushState(null, null, "/home")


  })

  const buttonAddReviewNavbar = sectionElement.querySelector("#add-review-navbar")
  buttonAddReviewNavbar.addEventListener("click", (e) => {
    e.preventDefault()
    sectionElement.innerHTML = ""
    sectionElement.append(home())
    window.scrollTo(0, 0)
    showReviewArea()
    window.history.pushState(null, null, "/home")

  })


  loadPosts(getSavedReviews())



  return sectionElement
}