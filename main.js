const addbutton = document.querySelector(".addbook");
const popup = document.querySelector(".popup");
const submit = document.querySelector(".submit");
const author = document.getElementById("author");
const book = document.getElementById("book");
const pages = document.getElementById("pages");
const haveread = document.getElementById("haveread");
const container = document.querySelector(".main-body");

addbutton.addEventListener("click", () => {
  popup.style.display = "flex";
});

submit.addEventListener("click", () => {
  addBookToLibrary();
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

let myLibrary = [];

function addBookToLibrary() {
  const bookValue = book.value.trim();
  const authorValue = author.value.trim();
  const pagesValue = parseInt(pages.value);
  const beenRead = haveread.checked;

  if (
    bookValue === "" ||
    authorValue === "" ||
    isNaN(pagesValue) ||
    pagesValue <= 0
  ) {
    alert("Please enter valid book information.");
    return;
  }

  const newBook = new Book(bookValue, authorValue, pagesValue, beenRead);
  myLibrary.push(newBook);

  saveLibraryToLocalStorage();

  renderBooks();

  popup.style.display = "none";

  book.value = "";
  author.value = "";
  pages.value = "";
}

function saveLibraryToLocalStorage() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function renderBooks() {
  container.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const divToRemove = document.createElement("div");
    divToRemove.className = "thebook";

    const indicatorButton = document.createElement("button");
    indicatorButton.className = "indicator";
    indicatorButton.setAttribute("data-read", book.read);
    updateButtonAppearance(indicatorButton);

    indicatorButton.addEventListener("click", () => {
      book.read = !book.read;
      indicatorButton.setAttribute("data-read", book.read);
      updateButtonAppearance(indicatorButton);

      saveLibraryToLocalStorage();
    });

    const one = document.createElement("h1");
    one.innerHTML = book.title;

    const two = document.createElement("h2");
    two.innerHTML = book.author;

    const three = document.createElement("h3");
    three.innerHTML = book.pages;

    const removeButton = document.createElement("button");
    removeButton.className = "remover";
    removeButton.innerHTML = "Remove";
    removeButton.setAttribute("data-index", index);

    divToRemove.appendChild(indicatorButton);
    divToRemove.appendChild(one);
    divToRemove.appendChild(two);
    divToRemove.appendChild(three);
    divToRemove.appendChild(removeButton);

    container.appendChild(divToRemove);
  });
}

function updateButtonAppearance(button) {
  const readStatus = button.getAttribute("data-read");
  if (readStatus === "true") {
    button.style.backgroundColor = "green";
    button.style.color = "white";
    button.innerHTML = "Complete";
  } else {
    button.style.backgroundColor = "red";
    button.style.color = "black";
    button.innerHTML = "Incomplete";
  }
}

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("remover")) {
    const dataIndex = event.target.getAttribute("data-index");
    removeBook(myLibrary[dataIndex]);
  }
});

function removeBook(bookToRemove) {
  const index = myLibrary.indexOf(bookToRemove);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    renderBooks();
    saveLibraryToLocalStorage();
  }
}

pages.addEventListener("input", () => {
  const maxPages = 10000;
  if (parseInt(pages.value) > maxPages) {
    pages.value = maxPages;
  }
});

window.addEventListener("load", () => {
  if (localStorage.getItem("library")) {
    myLibrary = JSON.parse(localStorage.getItem("library"));
    console.log(myLibrary);
    renderBooks();
  }
});
