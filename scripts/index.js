const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

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

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function handleEscapeKey(event) {
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
  // resetValidation(ProfileForm, [ProfileNameInput, ProfileDescriptionInput]);
  // ^ This line is commented out because I don't see it in my project tasks to build a function for this.
  openModal(ProfileModal);
});

NewPostBtn.addEventListener("click", function () {
  openModal(NewPostModal);
});

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

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEL.textContent = ProfileNameInput.value;
  profileDescriptionEL.textContent = ProfileDescriptionInput.value;
  closeModal(ProfileModal);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: CardCaptionInput.value,
    link: CardImageInput.value,
  };

  const CardElement = getCardElement(inputValues);
  cardsList.prepend(CardElement);

  NewPostForm.reset();
  disableButton(newPostSubmitBtn, settings);
  closeModal(NewPostModal);
}

ProfileForm.addEventListener("submit", handleEditProfileSubmit);
NewPostForm.addEventListener("submit", handleNewPostSubmit);

initialCards.forEach(function (item) {
  const CardElement = getCardElement(item);
  cardsList.append(CardElement);
});
