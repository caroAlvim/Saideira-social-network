import {
  currentUser,
  createReview,
  uploadImageBooks,
  getReviews,
  getPost,
  like,
  deletePost,
  saveReview,
  sendComment,
  deleteComment,
  save,
  editReview
} from "./index.js"

import { comment } from "../components/comment/index.js";



export const showReviewArea = () => {
  const formReview = document.querySelector(".review-area");
  formReview.style.display = "flex";
  document.querySelector(".welcome").style.display = "none"
  document.querySelector(".button-make-review").style.display = "none";
  document.querySelector(".make-review").style.background = "linear-gradient(300.92deg, #5E97AF 6.15%, #6D9ACE 80.44%, #5694DC 100.96%)";
  document.querySelector(".p-make-review").style.display = "none"

}

export const profileImage = () => {
  const user = currentUser()
  const imageUrl = user.photoURL
  let profileImg

  if (imageUrl != null) {
    profileImg = user.photoURL
  } else {
    profileImg = "./img/default-img.png"
  }
  return profileImg
}


export const loadPosts = (functionFirebase) => {
  const user = currentUser()
  const userId = user.uid

  const reviewsData = () => {

    functionFirebase
      .then((snap) => {
        const allReviews = document.querySelector("[data-all-reviews]")
        allReviews.innerHTML = ""

        snap.forEach((doc) => {

          const postId = doc.id
          const name = doc.data().userName
          const date = doc.data().datePost
          const hour = doc.data().hourPost
          const bookImageUrl = doc.data().imageUrl
          const userImageUrl = doc.data().userImg
          const bookTitle = doc.data().book
          const author = doc.data().author
          const rating = doc.data().rating
          const reviewContent = doc.data().review
          const reviewLikes = doc.data().likes
          const reviewSaves = doc.data().saves

          let userName
          let userName2
          const userNameFirebase = user.displayName

          if (name != null && name != undefined) {
            userName = name
            userName2 = "@" + userName.replace(/\s/g, '').toLowerCase();
          } else {
            userName = "Usuário anônimo"
            userName2 = ""
          }


          let userImage
          if (userImageUrl != null) {
            userImage = userImageUrl
          } else {

            userImage = "./img/default-img.png"
          }

          let reviewTemplate =

            `<div class="posts-reviews" id="${doc.id}" data-post>
              <div class="data-post">
                <div class="main-information-post">
                  <div class="information-post-wrapper">
                    <div class="user-post">
                      <img class="photo-post-review" src=${userImage}>
                      <div class="user-wrapper">
                        <div class="user-information-post">
                          <h1 class="name-profile-post">${userName}</h1>
                          <p class="username-post">${userName2}</p>  
                        </div>
                        <div class="date">
                          <p class="date-post">${date}</p>
                          <p class="date-post">${hour}</p>
                        </div>
                        
                      </div>
                    </div>
                    <div class="book-information">
                      <div class="title-wrapper">
                        <h2 class="title-book"> ${bookTitle} </h2>
                        <span class="stars-show">${rating}</span>
                      </div>
                      <h3 class="name-author">${author} </h3>
                    </div>
                  </div>
                  <div class="book-image" id="photo-${postId}">
                    
                  <div>
                </div>
              </div>
                        
              </div>
              <div class="data-book-post">
                  
                  <p class="content-review">${reviewContent}</p> </br>
              </div>
              <div class="likes-container">
              <button class="like"><img class="like-img"data-item="like" id="like-${postId}" src="./img/heart.png"></button>
              <span class="num-likes">${reviewLikes.length}</span>
              <button  class="comment-btn" ><img class="comment" src="./img/comment-btn.png"  data-item="comment"/></button>
                <div class="save" id="save-${postId}"><img class="icon-save"src="img/save-navbar.png"/></div>
                <span class="num-saves">${reviewSaves.length}</span>
                <div class="optionsedition" id="edition-${postId}" data-option style="display:none">
                <div class="container-edit-btns">
                  <button class="edit-delete" id="edit-post" data-item="edit">Editar</button>
                    <section data-open-edit class="confirm-edit" id="editing-${postId}">
                    </section>
                  <button class="edit-delete" id="delete-post" data-item="delete">Excluir</button>
                </div>
                  <div class="confirm-delete">
                    <div class="confirm-modal">
                      <h1 class="h1-confirm-delete">Você tem certeza que quer excluir esse post?</h1>
                        <button class="confirm-buttons" id="yes-delete">Confirmar</button>
                        <button class="confirm-buttons" id="no-delete">Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="comments-container" id="comment-${postId}">
                <div class="comment-post" data-set="add-comment-container" style="display:none" >
                  <div class="comment-image-div">
                    <img src="${profileImage()}"class="comment-user-image"/>
                  </div>
                  <div class="comment-text comment-text-form">
                    <div class="comment-headline">
                      <p class="comment-username">${currentUser().displayName}</p>
                    </div>
            
                    <textarea class="input-comment" rows="1" data-item="add-comment" placeholder="Adicione seu comentário." wrap="hard"></textarea>
                    <button class="send-comment" data-item="send-comment">Publicar</button>
                    <div>
                </div>
              </div>
              
            </div>`


          allReviews.innerHTML += reviewTemplate

          if (userId == doc.data().userId) {
            const edition = document.querySelector(`#edition-${postId}`)
            edition.style.display = "block"
          }


          const txtAreas = document.querySelectorAll('.input-comment');
          for (let i = 0; i < txtAreas.length; i++) {
            txtAreas[i].addEventListener('input', function () {
              if (this.scrollHeight > this.offsetHeight) this.rows += 1;
            });
          }



          const postSelected = allReviews.querySelectorAll("[data-post]")
          for (let post of postSelected) {
            post.addEventListener("click", (e) => {
              const postId = post.getAttribute("id")
              const target = e.target
              const targetDataset = target.dataset.item
              if (targetDataset == "delete") {
                const divDelete = target.parentNode.parentNode.children[1]
                const divYes = target.parentNode.parentNode.children[1].children[0].children[1]
                const divNo = target.parentNode.parentNode.children[1].children[0].children[2]
                divDelete.style.display = "block"
                divYes.addEventListener("click", () => {
                  deletePost(postId)
                    .then(() => {
                      divDelete.style.display = "none"
                      post.remove()
                    })
                    .catch(e => {
                      console.log("erro")
                    })
                })
                divNo.addEventListener("click", () => {
                  divDelete.style.display = "none"
                })
              }
            })
          }


          if (bookImageUrl != null) {
            document.querySelector(`#photo-${doc.id}`).innerHTML = `<img class="photo-book-review-post" src=${bookImageUrl}></img>`
          }

          const heart = allReviews.querySelector(`#like-${doc.id}`)
          if (reviewLikes.indexOf(userId) != -1) {
            heart.classList.add("active");
          }

          const saved = allReviews.querySelector(`#save-${doc.id}`)
          if (reviewSaves.indexOf(userId) != -1) {
            saved.classList.add("saved");
          }

          const saveDivList = allReviews.querySelectorAll(".save");

          for (let div of saveDivList) {
            div.addEventListener("click", () => {
              div.classList.toggle('saved');
              const idSave = div.getAttribute("id")
              const idReviewSaved = idSave.slice(5)
              const numSavesDiv = div.nextSibling.nextSibling
              let updatedNumSaves
              getPost(idReviewSaved).then((review) => {
                const saveArray = review.data().saves
                if (saveArray.indexOf(userId) === -1) {
                  updatedNumSaves = saveArray.length + 1
                  saveReview(userId, idReviewSaved)
                } else {
                  updatedNumSaves = saveArray.length - 1
                }
                numSavesDiv.innerText = updatedNumSaves
                save(idReviewSaved, userId)

              })
                .catch((error) => {
                  console.log("Error getting documents: ", error)
                })

            })
          }
        })

        const postDivList = allReviews.querySelectorAll("[data-post]")
        const root = document.querySelector("#root")


        for (let post of postDivList) {
          post.addEventListener("click", (e) => {
            const postId = post.getAttribute("id")
            const target = e.target
            console.log(target)
            const targetDataset = target.dataset.item
            if (targetDataset == "like") {
              likePost(target, postId)
            }

            if (targetDataset == "comment") {
              const parentDiv = target.parentNode.parentNode.parentNode
              const commentDiv = parentDiv.children[3].children[0]
              commentDiv.children[1].children[1].value = ""
              commentDiv.children[1].children[1].placeholder = "Adicione um comentário."

              commentDiv.style.display = "flex"
              root.addEventListener("click", (e) => {
                const target = e.target
                const targetDataset = target.dataset.item
                if (targetDataset != "add-comment") {
                  commentDiv.style.display = "none"
                }

              }, true)
            }

            if (targetDataset == "delete-comment") {
              const commentsDiv = target.parentNode.parentNode.parentNode
              const commentValue = commentsDiv.children[1].children[1].innerText
              const divDelete = target.parentNode.children[1]
              const divYes = target.parentNode.children[1].children[0].children[1]
              const divNo = target.parentNode.children[1].children[0].children[2]
              const userPhoto = currentUser().photoURL
              const userName = currentUser().displayName
              const completeDate = target.parentNode.parentNode.children[0].children[1].innerText
              const hour = target.parentNode.parentNode.children[0].children[2].innerText
              divDelete.style.display = "block"
              divYes.addEventListener("click", () => {
                deleteComment(postId, commentValue, userId, userPhoto, userName, completeDate, hour)
                  .then(() => {
                    divDelete.style.display = "none"
                    commentsDiv.remove()
                  })
                  .catch(e => {
                    console.log("erro", e)
                  })
              })
              divNo.addEventListener("click", () => {
                divDelete.style.display = "none"
              })

            }
            if (targetDataset == "send-comment") {
              const commentsDiv = target.parentNode.parentNode.parentNode
              const commentValue = commentsDiv.children[0].children[1].children[1].value
              if (commentValue.replace(/\s/g, '') != "") {
                const userPhoto = currentUser().photoURL
                const userName = currentUser().displayName
                const date = new Date()
                const completeDate = date.toLocaleDateString("en-GB")
                const hour = date.toLocaleTimeString("pt-BR", {
                  timeStyle: "short",
                  hour12: false,
                  numberingSystem: "latn"
                });
                sendComment(postId, commentValue, completeDate, hour)
                  .then(() => {
                    const divAppend = commentsDiv.children[1]
                    commentsDiv.insertBefore(comment(userId, userPhoto, userName, commentValue, completeDate, hour), divAppend)
                  })

                  .catch((error) => {
                    console.error("Error writing document: ", error);
                  })

              }

            }
            if (targetDataset == "edit") {
              openReviewEdit(postId)
            }
          })
        }

        for (let post of postDivList) {
          const postId = post.getAttribute("id")
          const divComments = post.children[0].children[3]
          getPost(postId)
            .then((review) => {
              if (userId == review.data().userId) {
                const edition = document.querySelector(`#edition-${postId}`)
                edition.style.display = "block"
              }

              //divComments.append(comment(userImage, userName,text, date, hour))

            })
            .catch(() => {
              console.log("Error getting documents: ", error)

            })
        }

        for (let post of postDivList) {
          const postId = post.getAttribute("id")
          const divComments = post.children[0].children[3]
          getPost(postId)
            .then((review) => {
              const commentsArray = review.data().comments
              const orderedComments = commentsArray.reverse()
              for (let com of orderedComments) {
                const userImage = com.userImg
                const userName = com.userName
                const text = com.value
                const userIdComment = com.userId
                const date = com.dateOfComment
                const hour = com.hourOfComment

                divComments.append(comment(userIdComment, userImage, userName, text, date, hour))
              }
            })
            .catch(() => {
              console.log("Error getting documents: ", error)

            })
        }

      })
      .catch((error) => {
        console.log("Error getting documents: ", error)
      })

  }

  reviewsData()

}



export const publishReview = (e) => {
  const user = currentUser()
  const userId = user.uid
  e.preventDefault()
  const date = new Date()
  const completeDate = date.toLocaleDateString("en-GB")
  const hour = date.toLocaleTimeString("pt-BR", {
    timeStyle: "short",
    hour12: false,
    numberingSystem: "latn"
  });


  document.querySelector(".review-area").style.display = "none"
  document.querySelector(".welcome").style.display = "flex"
  document.querySelector(".button-make-review").style.display = "block";
  document.querySelector(".make-review").style.background = "linear-gradient(600.92deg, #5E97AF 6.15%, #6D9ACE 52.44%, #5694DC 77.96%, #4C64A4 95.61%)";
  document.querySelector(".p-make-review").style.display = "block"

  const formReview = document.querySelector(".review-area");
  formReview.style.display = "none";

  const userNameFirebase = user.displayName
  const bookName = document.querySelector("[data-book-input]").value
  const authorName = document.querySelector("[data-author-input]").value
  const starsEvaluation = document.querySelector('input[name="stars"]:checked').value
  const reviewUser = document.querySelector("[data-post-input]")
  const valueReview = reviewUser.value
  const image = document.getElementById("input-profile-img").files[0]
  const printReview = document.createElement("article")
  printReview.classList.add("new-review")

  window.scrollTo(0, 0)

  if (image != undefined) {
    uploadImageBooks("input-profile-img")
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        const urlImage = url
        return urlImage
      })
      .then((urlImage) => {
        createReview(bookName, authorName, valueReview, starsEvaluation, userNameFirebase, urlImage, completeDate, hour)

      })
      .then(() => {
        loadPosts(getReviews())
      })

  } else {
    createReview(bookName, authorName, valueReview, starsEvaluation, userNameFirebase, null, completeDate, hour)
      .then(() => {
        loadPosts(getReviews())
      })
  }
}

export const likePost = (target, postId) => {
  const user = currentUser()
  const userId = user.uid


  target.classList.toggle('active');

  const numLikesDiv = target.parentNode.nextSibling.nextSibling
  console.log(numLikesDiv)
  let updatedNumLikes
  getPost(postId)
    .then((review) => {
      const likesArray = review.data().likes
      if (likesArray.indexOf(userId) === -1) {
        updatedNumLikes = likesArray.length + 1
      } else {
        updatedNumLikes = likesArray.length - 1
      }
      numLikesDiv.innerText = updatedNumLikes
      like(postId, userId)

    })
    .catch(() => {
      alert("Falha ao curtir o post! Tente novamente.")

    })


}

export const openReviewEdit = (reviewId) => {

  getPost(reviewId).then(post => {

    const modalEdit = document.querySelector(`#editing-${reviewId}`)
    const showEdit = document.createElement('div')
    showEdit.classList.add("confirm-modal-edit")
    modalEdit.style.display = "block"

    const contentEdit = `               
                    <div >
                        <div class="confirm-modal-edit" id=${reviewId}>
                          <div class= "content-text">
                            <h1 class="h1-confirm-edit">Editar</h1>
                            <label class="review-label" for="book-${reviewId}">Livro:</label>
                            <textarea class="review-input-edit" data-type-book type="text" id="book-${reviewId}" required>${post.data().book}</textarea>
                              <ul class="warning-error" data-book-error> </ul> 
                            <label class="review-label" for="author-${reviewId}">Autor</label>
                            <textarea class="review-input-edit" data-type-author type="text" id="author-${reviewId}" required>${post.data().author}</textarea>
                              <ul class="warning-error" data-author-error> </ul> 
                            <textarea class="post-input-edit" id="review" cols="30" rows="5" data-review-edit required>${post.data().review}</textarea>
                          </div>
                         <label class="review-rating">Avalie</label>
                         <div class="stars-edit" >
                          <input type="radio" id="star-empty" name="stars" value="${post.data().rating || ""}" checked/>
                          <label for="str-1" class="stars"></label>
                          <input type="radio" id="str-1" data-stars-form name="stars" value="★"/>
                          <label for="str-2" class="stars"></label>
                          <input type="radio" id="str-2" data-stars-form name="stars" value="★★"/>
                          <label for="str-3" class="stars"></label>
                          <input type="radio" id="str-3" data-stars-form name="stars" value="★★★"/>
                          <label for="str-4" class="stars"></label>
                          <input type="radio" id="str-4" data-stars-form name="stars" value="★★★★"/>
                          <label for="str-5" class="stars"></label>
                          <input type="radio" id="str-5" data-stars-form name="stars" value="★★★★★"/> 
                        </div> 
                        <div class="error-stars-msg">
                          <ul class="warning-error" data-stars-error> </ul>
                        </div> 
                        <div class="align-btn">
                          <button class="confirm-buttons-edit" id="yes-edit" data-edit-send >Editar</button>
                          <button class="confirm-buttons-edit" id="no-edit" data-cancel-edit>Cancelar</button>
                        </div>
                    </div>`


    modalEdit.innerHTML = contentEdit

    const sendEdit = document.querySelector("[data-edit-send]")
    const cancelEdit = document.querySelector("[data-cancel-edit]")

    sendEdit.addEventListener("click", () => {

      const bookNameEdited = document.querySelector("[data-type-book]").value
      const authorNameEdited = document.querySelector("[data-type-author]").value
      const starsEvaluationElement = document.querySelector("[data-stars-form]:checked")
      let starsEvaluationEdited = ""
        if(starsEvaluationElement){
          starsEvaluationEdited = starsEvaluationElement.value
        }

      const reviewUserNew = document.querySelector("[data-review-edit]").value
      //const imageEdited = funcao de uploadimage
       console.log(starsEvaluationEdited)

      

      const verified = verifyInput(bookNameEdited, authorNameEdited, starsEvaluationEdited)
      console.log(verified)
        if(verified.status){
          editReview(authorNameEdited, bookNameEdited, reviewUserNew, starsEvaluationEdited, reviewId).then(() => {
            modalEdit.style.display = "none"
          }).then(() => {
            loadPosts(getReviews())
  
          })
        }
        //tratando erros
        document.querySelector("[data-book-error]").innerHTML = verified.book
        document.querySelector("[data-author-error]").innerHTML = verified.author
        document.querySelector("[data-stars-error]").innerHTML = verified.stars
    
    })
    cancelEdit.addEventListener("click", () => {
      modalEdit.style.display = "none"
    })
  })

}

export const verifyInput = (verifyBook, verifyAuthor, verifyStars) => {
  console.log("caiu no verifyInput")
  const bookLine = verifyBook.trim()
  const authorLine = verifyAuthor.trim()
  const starsValue = verifyStars.trim()
  
  let bookError = ""
  let authorError = ""
  let starsError =""

  if(!bookLine){
    bookError = `<li class="warning-msg"> Por favor, digite o nome do livro </li>`
    
  }
  if(!authorLine){
    authorError = `<li class="warning-msg"> Por favor, digite o nome do autor </li>`
  }
  if(!starsValue){
    starsError = `<li class="warning-msg"> Por favor, faça a sua avaliação </li>`
    
  }
  const verified = {
    book: bookError, 
    author: authorError,
    stars: starsError,
    status: (!bookError && !authorError && !starsError)
  }

  return verified 
  
}