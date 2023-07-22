const addbutton = document.querySelector(".addbook");
const popup = document.querySelector(".popup");
const submit = document.querySelector(".submit");
const author = document.getElementById("author");
const book = document.getElementById("book");
const pages = document.getElementById("pages");
const haveread = document.getElementById("haveread");
const container = document.querySelector(".main-body");
const removebutton = document.querySelector(".remover");

addbutton.addEventListener("click", () => {
  popup.style.display = "flex";
});

submit.addEventListener("click", () => {
  addBookToLibrary();
});

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const bookValue = book.value;
  const authorValue = author.value;
  const pagesValue = parseInt(pages.value);
  const beenRead = haveread.checked;

  if (
    bookValue.trim() !== "" &&
    authorValue.trim() !== "" &&
    !isNaN(pagesValue)
  ) {
    const newBook = new Book(bookValue, authorValue, pagesValue, beenRead);
    myLibrary.push(newBook);

    let one = document.createElement("h1");
    let two = document.createElement("h2");
    let three = document.createElement("h3");

    one.innerHTML = bookValue;
    two.innerHTML = authorValue;
    three.innerHTML = pagesValue;

    let four = document.createElement("button");
    four.className = "indicator";
    four.addEventListener("click", () => {
      if (newBook.read) {
        four.style.color = "black";
        four.style.backgroundColor = "red";
        four.innerHTML = "Incomplete";
        newBook.read = false;
      } else {
        four.style.color = "white";
        four.style.backgroundColor = "green";
        four.innerHTML = "Complete";
        newBook.read = true;
      }
    });

    let five = document.createElement("button");
    five.className = "remover";
    five.innerHTML = "Remove";
    five.setAttribute("data-index", myLibrary.length - 1);

    let six = document.createElement("div");
    six.className = "thebook";

    if (haveread.checked) {
      four.style.backgroundColor = "green";
      four.style.color = "white";
      four.innerHTML = "Complete";
    } else {
      four.style.backgroundColor = "red";
      four.style.color = "black";
      four.innerHTML = "Incomplete";
    }

    six.appendChild(four);
    six.appendChild(one);
    six.appendChild(two);
    six.appendChild(three);
    six.appendChild(five);

    container.appendChild(six);

    popup.style.display = "none";

    book.value = "";
    author.value = "";
    pages.value = "";
  }
}

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("remover")) {
    const divToRemove = event.target.parentNode;
    const dataIndex = divToRemove
      .querySelector(".remover")
      .getAttribute("data-index");

    myLibrary.splice(dataIndex, 1);

    divToRemove.remove();
  }
});
