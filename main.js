const addbutton = document.querySelector(".addbook");
const popup = document.querySelector(".popup")
const submit = document.querySelector(".submit")
const author = document.getElementById("author")
const book = document.getElementById("book")
const pages = document.getElementById("pages")
const haveread = document.getElementById("haveread")

addbutton.addEventListener("click", () => {
    popup.style.display = "flex";
})

submit.addEventListener("click", () => {
    popup.style.display = "none";
})

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {

}