const database = firebase.firestore()
const storage = firebase.storage()

export const loginPage = (email, password) => {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut()
  }
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
}

export const createUser = async (email, password) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
}

export const setPersistence = () => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
}

export const currentUser = () => {
  return firebase.auth().currentUser

}


export const logout = () => {
  firebase.auth().signOut()
}

export const updateUserName = (userName) => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: userName,
  })
}

export const updateUserImage = (urlImage) => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    photoURL: urlImage,
  })
}



// export const asyncGetProfileData = async () => {
//   const logProfiles = await database.collection("profiles").get()
//   for ( data of logProfiles.docs){
//     profile = {
//       name: document.id,
//       image: document.image
//     }
//     console.log(profile)
//   }
// }


export const signInGoogleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)

}
/*
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    .then((result) => {
    //@type {firebase.auth.OAuthCredential} 
    var credential = result.credential;
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  })
  .catch((error) => {
    
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
*/

export const signOut = () => {
  firebase
    .auth()
    .signOut()
  /*
  .then(() => {
    // Sign-out successful.
  }).catch((error) => {
    swal.fire({
      icon: "error",
      title: error.message,
    })// An error happened.
  });
 */
}

export const uploadImage = (id, userid) => {
  const ref = storage.ref()
  const file = document.getElementById(id).files[0]
  const imageName = userid
  const metadata = {
    contentType: file.type,
  }

  return ref.child("profilephotos").child(imageName).put(file, metadata)
}

export const uploadImageBooks = (id) => {
  const ref = storage.ref()
  const imageName = ((new Date().getTime() / 1000) * Math.random()).toString()
  const file = document.getElementById(id).files[0]
  const metadata = {
    contentType: file.type,
  }

  return ref.child("bookcover").child(imageName).put(file, metadata)

}

export const forgotPassword = (email) => {
  if (email !== '') {
    return firebase.auth()
      .sendPasswordResetEmail(email)
  }
}


export const createReview = (bookUser, authorUser, reviewUser, ratingStars, nameUser, image, date, hour) => {
  //const dateReview = new Date()

  database
    .collection("reviews").add({
      book: bookUser,
      author: authorUser,
      review: reviewUser,
      rating: ratingStars,
      userName: nameUser,
      userId: firebase.auth().currentUser.uid,
      userImg: firebase.auth().currentUser.photoURL,
      datePost: date,
      hourPost: hour,
      likes: [],
      comments: [],
      saves: [],
      imageUrl: image
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.log("Error writing documents: ", error);
    });
}


export const getReviews = () => {
  return database
    .collection('reviews').orderBy('datePost', 'desc').orderBy('hourPost', 'desc').get()
}



export const getPost = (postID) => {
  const review = database.collection("reviews").doc(postID)
  return review.get()
}

// export const removeLike = (postUID, userUID) =>{
//   database.collection("reviews").doc(postUID)
//   .update({ 
//     likes: firebase.firestore.FieldValue.arrayRemove(userUID) 
//   })
// }

export const updateReviews = (idReview) => {
  return database
    .collection("reviews").onSnapshot(snapshot => {
      snapshot.docChanges(idReview).forEach(post => {
        if (post.type == "added") {
          console.log("added")
          //getReviews(post.doc.data(), post.doc.id);
        }
        if (post.type == "modified") {
          console.log("modified");
        }
        if (post.type == "removed") {
          console.log("removed")
        }
      })
    })
}


export const like = (postID, userID) => {
  let numberOfLikes
  const review = database.collection("reviews").doc(postID)
  review.get()
    .then((rev) => {
      const likesArray = rev.data().likes
      console.log(likesArray)
      if (likesArray.indexOf(userID) === -1) {
        review.update({
          likes: firebase.firestore.FieldValue.arrayUnion(userID)
        })
        numberOfLikes = (likesArray.length) + 1

      } else {
        review.update({
          likes: firebase.firestore.FieldValue.arrayRemove(userID)
        })
        numberOfLikes = (likesArray.length) - 1
        console.log(numberOfLikes)
      }
      console.log(numberOfLikes)

    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    })


}
export const deletePost = (postId) => {
  return database.collection("reviews").doc(postId).delete()
}


export const editReview = (authorEdited, bookEdited, textEdited, starsRatingEdited, reviewId) => {
  return database
    .collection("reviews")
    .doc(reviewId)
    .update({ author: authorEdited,
      book: bookEdited,
      review: textEdited,
      rating: starsRatingEdited 
    }).then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.log("Error updating documents: ", error);
    });
}

export const saveReview = (userId, postId) => {
  return database
    .collection("saveReviews").add({
      userId: userId,
      postId: postId
    })
}

// export const deleteSaveReview = () => {
//   database.
//   collection("saveReviews").doc().delete().then(() => {
//     console.log("Document successfully deleted!");
//   }).catch((error) => {
//     console.error("Error removing document: ", error);
//   });
// }

export const save = (postID, userID) => {
  let numberOfSaves
  const saveReviews = database.collection("reviews").doc(postID)
  saveReviews.get()
    .then((review) => {
      const savesArray = review.data().saves
      if (savesArray.indexOf(userID) === -1) {
        saveReviews.update({
          saves: firebase.firestore.FieldValue.arrayUnion(userID)
        })
        numberOfSaves = (savesArray.length) + 1
      } else {
        saveReviews.update({
          saves: firebase.firestore.FieldValue.arrayRemove(userID)
        })
        numberOfSaves = (savesArray.length) - 1
      }
    })
    .catch((error) => { })
}
