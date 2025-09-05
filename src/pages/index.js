import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "291e10ea-d07d-47a2-a5c0-257020a82bd2",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, users]) => {
    cards.forEach(function (item) {
      const CardElement = getCardElement(item);
      cardsList.append(CardElement);
    });

    profileNameEL.textContent = users.name;
    profileDescriptionEL.textContent = users.about;
    profileAvatarEl.src = users.avatar;
  })
  .catch(console.error);

const ProfileBtn = document.querySelector(".profile__edit-btn");
const ProfileModal = document.querySelector("#edit-profile-modal");
const ProfileCloseBtn = ProfileModal.querySelector(".modal__close-btn");
const ProfileForm = ProfileModal.querySelector(".modal__form");
const ProfileNameInput = ProfileModal.querySelector("#profile-name-input");
const ProfileDescriptionInput = ProfileModal.querySelector(
  "#profile-description-input"
);

const NewPostBtn = document.querySelector(".profile__add-btn");
const NewPostModal = document.querySelector("#new-post-modal");
const newPostSubmitBtn = NewPostModal.querySelector(".modal__submit-btn");
const newPostCloseBtn = NewPostModal.querySelector(".modal__close-btn");
const NewPostForm = NewPostModal.querySelector(".modal__form");
const CardImageInput = NewPostModal.querySelector("#card-image-input");
const CardCaptionInput = NewPostModal.querySelector("#card-caption-input");

const profileNameEL = document.querySelector(".profile__name");
const profileDescriptionEL = document.querySelector(".profile__description");
const profileAvatarEl = document.querySelector(".profile__avatar");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

// avatar form elements
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");

// delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".cards__list");

let selectedCard, selectedCardId;

function handleLike(evt, id) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__like-btn_active");

  api
    .handleLike(id, isLiked)
    .then((data) => {
      if (data.isLiked) {
        likeButton.classList.add("card__like-btn_active");
      } else {
        likeButton.classList.remove("card__like-btn_active");
      }
    })
    .catch(console.error);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  const cancelDeleteBtn = deleteModal.querySelector(
    ".modal__submit-btn_type_cancel"
  );

  cancelDeleteBtn.addEventListener("click", () => {
    closeModal(deleteModal);
  });

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-btn_active");
  }

  cardLikeBtnEl.addEventListener("click", (evt) => handleLike(evt, data._id));

  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardElement, data);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function handleEscapeKey(event) {
  let activeModals = null;
  activeModals =
    event.key === "Escape" ? document.querySelector(".modal_is-opened") : null;
  if (activeModals) {
    closeModal(activeModals);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

ProfileBtn.addEventListener("click", function () {
  ProfileNameInput.value = profileNameEL.textContent;
  ProfileDescriptionInput.value = profileDescriptionEL.textContent;
  resetValidation(ProfileForm, settings);
  openModal(ProfileModal);
});

NewPostBtn.addEventListener("click", function () {
  openModal(NewPostModal);
  resetValidation(NewPostForm, settings);
});

avatarModalBtn.addEventListener("click", () => {
  resetValidation(avatarForm, settings);
  openModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmitBtn);

deleteForm.addEventListener("submit", handleDeleteSumbit);

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  document.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("modal__close-btn") ||
      event.target.classList.contains("modal")
    ) {
      closeModal(modal);
    }
  });
});

function handleAvatarSubmitBtn(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      profileAvatarEl.src = data.avatar;
      avatarForm.reset();
      avatarSubmitBtn.disabled = true;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editUserInfo({
      name: ProfileNameInput.value,
      about: ProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEL.textContent = data.name;
      profileDescriptionEL.textContent = data.about;
      closeModal(ProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .postNewCard({
      name: CardCaptionInput.value,
      link: CardImageInput.value,
    })
    .then((data) => {
      const CardElement = getCardElement(data);
      cardsList.prepend(CardElement);
      NewPostForm.reset();
      disableButton(newPostSubmitBtn, settings);
      closeModal(NewPostModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleDeleteSumbit(evt) {
  evt.preventDefault();

  const deleteBtn = evt.submitter;
  setButtonText(deleteBtn, true, "Delete", "Deleting");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      selectedCard = null;
      selectedCardId = null;
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(deleteBtn, false, "Delete", "Deleting");
    });
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

ProfileForm.addEventListener("submit", handleEditProfileSubmit);
NewPostForm.addEventListener("submit", handleNewPostSubmit);

enableValidation(settings);
