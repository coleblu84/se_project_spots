const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const editNewPostBtn = document.querySelector(".profile__add-btn");
const editNewPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = editNewPostModal.querySelector(".modal__close-btn");

const editNewPostForm = editNewPostModal.querySelector(".modal__form");
const editCardImageInput = editNewPostModal.querySelector("#card-image-input");
const editCardCaptionInput = editNewPostModal.querySelector(
  "#card-caption-input"
);

const profileNameEL = document.querySelector(".profile__name");
const profileDescriptionEL = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEL.textContent;
  editProfileDescriptionInput.value = profileDescriptionEL.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

editNewPostBtn.addEventListener("click", function () {
  editNewPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  editNewPostModal.classList.remove("modal_is-opened");
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEL.textContent = editProfileNameInput.value;
  profileDescriptionEL.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  console.log(editCardImageInput.value);
  console.log(editCardCaptionInput.value);
  editNewPostModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
editNewPostForm.addEventListener("submit", handleNewPostSubmit);