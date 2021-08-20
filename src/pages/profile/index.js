import { currentUser, getProfileReviews } from "../../lib/index.js"
import { sidebar } from "../../components/sidebar/index.js"
import { loadPosts, profileImage, showReviewArea } from "../../lib/functions-home.js"
import { navbar } from "../../components/navbar/index.js"
import home from "../home/index.js"


export default () => {


  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("class", "profile-content")

  const user = currentUser()
  const name = user.displayName

  let userName
  if (name != null && name != undefined) {
    userName = name

  } else {
    userName = "Usuário anônimo"

  }


  const profileTemplate = `
  <div class="profile-container">
   
    <header>
      <p class="header-home">Bookish</p>
      <button class="btn-home-profile">
        <img class="icon-home" src="img/home-blue.png">
        <p class="home-profile-text">Home</p>
      </button>
    </header>
  
    <div class="head-profile">
      <div class="photo-profile-div">
        <img  class="photo-profile" src="${profileImage()}">
      </div>
      <p class="user-name-profile">${name}</p> 
    </div>
    
    <div data-all-reviews class= "all-reviews"></div>
    
    </div>
    <div class="load">
    <div class="loading"></div>
  </div>
    
  `
  sectionElement.innerHTML = profileTemplate

  sectionElement.appendChild(navbar())
  sectionElement.appendChild(sidebar())

  sectionElement.querySelector(".sidebar").style.display = "none"
  sectionElement.querySelector(".sidebar").style.zIndex = "2"

  const buttonHome = sectionElement.querySelector(".btn-home-profile")
  buttonHome.addEventListener("click", (e) => {
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

  const buttonAddReviewNavbar = sectionElement.querySelector("#add-review-navbar")
  buttonAddReviewNavbar.addEventListener("click", (e) => {
    e.preventDefault()
    sectionElement.innerHTML = ""
    sectionElement.appendChild(home())
    window.scrollTo(0, 0)
    showReviewArea()
    window.history.pushState(null, null, "/home")

  })

  const buttonAddReviewSidebar = sectionElement.querySelector("#add-review-sidebar")
  buttonAddReviewSidebar.addEventListener("click", (e) => {
    e.preventDefault()
    sectionElement.innerHTML = ""
    sectionElement.appendChild(home())
    window.scrollTo(0, 0)
    showReviewArea()
    window.history.pushState(null, null, "/home")

  })

  loadPosts(getProfileReviews(currentUser().uid))

  return sectionElement
}