const database = firebase.firestore();
const storage = firebase.storage();

export const loginPage = (email, password) => {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  }
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
};

export const signInGoogleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider);
};

export const createUser = async (email, password) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
};

export const currentUser = () => firebase.auth().currentUser;

export const logout = () => {
  firebase.auth().signOut();
};

export const updateUserName = (userName) => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: userName,
  });
};

export const updateUserImage = (urlImage) => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    photoURL: urlImage,
  });
};

export const uploadImage = (id, userid) => {
  const ref = storage.ref();
  const file = document.getElementById(id).files[0];
  const imageName = userid;
  const metadata = {
    contentType: file.type,
  };

  return ref.child('profilephotos').child(imageName).put(file, metadata);
};

export const uploadImageBooks = (id) => {
  const ref = storage.ref();
  const imageName = ((new Date().getTime() / 1000) * Math.random()).toString();
  const file = document.getElementById(id).files[0];
  const metadata = {
    contentType: file.type,
  };

  return ref.child('bookcover').child(imageName).put(file, metadata);
};

// eslint-disable-next-line consistent-return
export const forgotPassword = (email) => {
  if (email !== '') {
    return firebase.auth()
      .sendPasswordResetEmail(email);
  }
};

export const createReview = (bookUser, authorUser, reviewUser, ratingStars,
  nameUser, image, date, hour) => database
    .collection('reviews').add({
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
      imageUrl: image,
    });

export const getReviews = () => database
  .collection('reviews').orderBy('datePost', 'desc').orderBy('hourPost', 'desc').get();

export const getPost = (postID) => {
  const review = database.collection('reviews').doc(postID);
  return review.get();
};

export const like = (postID, userID) => {
  const review = database.collection('reviews').doc(postID);
  review.get()
    .then((rev) => {
      const likesArray = rev.data().likes;
      if (likesArray.indexOf(userID) === -1) {
        review.update({
          likes: firebase.firestore.FieldValue.arrayUnion(userID),
        });
      } else {
        review.update({
          likes: firebase.firestore.FieldValue.arrayRemove(userID),
        });
      }
    });
  // .catch((error) => {
  //   console.error('Error writing document: ', error);
  // });
};

export const sendComment = (postID, value, date, hour) =>
  database.collection('reviews').doc(postID).update({
    comments: firebase.firestore.FieldValue.arrayUnion(
      {
        value,
        userId: firebase.auth().currentUser.uid,
        userImg: firebase.auth().currentUser.photoURL,
        userName: firebase.auth().currentUser.displayName,
        dateOfComment: date,
        hourOfComment: hour,
      },
    ),
  });

export const deleteComment = (postID, value, userId, userImg,
  userName, date, hour) => database.collection('reviews').doc(postID).update({
    comments: firebase.firestore.FieldValue.arrayRemove(
      {
        value,
        userId,
        userImg,
        userName,
        dateOfComment: date,
        hourOfComment: hour,
      },
    ),
  });

export const deletePost = (postId) => database.collection('reviews').doc(postId).delete();

export const editReview = (authorEdited, bookEdited, textEdited,
  starsRatingEdited, reviewId) => database
    .collection('reviews')
    .doc(reviewId)
    .update({
      author: authorEdited,
      book: bookEdited,
      review: textEdited,
      rating: starsRatingEdited,
    });

export const saveReview = (userId, postId) => database
  .collection('saveReviews').add({
    userId,
    postId,
  });

export const save = (postID, userID) => {
  const saveReviews = database.collection('reviews').doc(postID);
  saveReviews.get()
    .then((review) => {
      const savesArray = review.data().saves;
      if (savesArray.indexOf(userID) === -1) {
        saveReviews.update({
          saves: firebase.firestore.FieldValue.arrayUnion(userID),
        });
      } else {
        saveReviews.update({
          saves: firebase.firestore.FieldValue.arrayRemove(userID),
        });
      }
    });
  // .catch((error) => {
  //   console.log('Error getting documents: ', error);
  // });
};

export const getSavedReviews = () => database
  .collection('reviews').where('saves', 'array-contains',
    firebase.auth().currentUser.uid).orderBy('datePost', 'desc').orderBy('hourPost', 'desc')
  .get();

export const getProfileReviews = (userId) => database
  .collection('reviews').where('userId', '==', userId).orderBy('datePost', 'desc').orderBy('hourPost', 'desc')
  .get();
