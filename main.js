const addbutton = document.querySelector(".addbook");
const popup = document.querySelector(".popup");
const submit = document.querySelector(".submit");
const author = document.getElementById("author");
const book = document.getElementById("book");
const pages = document.getElementById("pages");
const haveread = document.getElementById("haveread");
const container = document.querySelector(".main-body");
const removebutton = document.querySelector(".remover")

addbutton.addEventListener("click", () => {
    popup.style.display = "flex";
})

submit.addEventListener("click", () => {
    addBookToLibrary()
})

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
    if (bookValue.trim() !== "" && authorValue.trim() !== "" && !isNaN(pagesValue)) {
        let one = document.createElement("h1");
        let two = document.createElement("h2");
        let three = document.createElement("h3");
    
        one.innerHTML = bookValue;
        two.innerHTML = authorValue;
        three.innerHTML = pagesValue;
    
        let four = document.createElement("button");
        four.className = "indicator";
    
        let five = document.createElement("button");
        five.className = "remover";
        five.innerHTML = "Remove"
    
        let six = document.createElement("div");
        six.className = "thebook";
    
        if (haveread.checked) {
            four.style.backgroundColor = "green";
            four.style.color = "white";
            four.innerHTML = "Complete"
        } else {
            four.style.backgroundColor = "red";
            four.style.color = "black";
            four.innerHTML = "Incomplete"
        }
    
        six.appendChild(four);
        six.appendChild(one);
        six.appendChild(two);
        six.appendChild(three);
        six.appendChild(five);
    
        container.appendChild(six);
    
        popup.style.display = "none";
    }
    
}

container.addEventListener("click", (event) => {
    if (event.target.classList.contains("remover")) {
      const divToRemove = event.target.parentNode;
  
      divToRemove.remove();
    }

    if (event.target.classList.contains("indicator")) {
        if (event.target.style.backgroundColor == "red") {
            event.target.style.color = "white"
            event.target.style.backgroundColor = "green"
            event.target.innerHTML = "Complete"
        } else if (event.target.style.backgroundColor == "green") {
            event.target.style.color = "black"
            event.target.style.backgroundColor = "red"
            event.target.innerHTML = "Incomplete"
        }
    }
  });

