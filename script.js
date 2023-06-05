const myBooks = [
    {title: "Wedlock of the Gods", author: "Zulu Sofola", pages: 250, read: "not read yet", uniqueAttr: 0},
    {title: "Lord of the Rings", author: "J.R.R. Tolkien", pages: 320, read: "read", uniqueAttr: 1},
    {title: "The Gods Must Be Crazy", author: "Jamie Uys", pages: 198, read: "not read", uniqueAttr: 2 },
]; 

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author,
        this.read = read;
        this.uniqueAttr = myBooks.length;
    }
}

const addBookButton = document.querySelector("button.add-new-book");
addBookButton.addEventListener("click", showFormModal);

function showFormModal() {
    const formModal = document.querySelector("section.form");
    formModal.style.display = "flex";
    const submitButton = document.querySelector('button[type="submit"]');
    const closeModal = document.querySelector("span");
    submitButton.addEventListener("click", submitButtonHandler);
    closeModal.addEventListener("click", closeModalFunction);
    }

function createNewBook() {
    const newTitle = document.querySelector('input[id="title"]').value;
    const newAuthor = document.querySelector('input[id="author"]').value;
    const newPages = document.querySelector('input[id="pages"]').value;
    const check = document.querySelector('input[id="read"]').checked;
    const newRead = check ? "read" : "not read yet";
    // create newBook object only if the new title author and pages input fields aren't empty.
    if (newTitle && newAuthor && newPages) {
      const newBook = new Book(newTitle, newAuthor, newPages, newRead);
      myBooks.push(newBook);
      createBookCard(newBook);
      closeModalFunction();
    }
    else {
        alert("Book Entry Cannot Be Empty");
    }  
}

/*function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uniqueAttr = myBooks.length;
} */


function submitButtonHandler(event) {
    createNewBook();
    event.preventDefault();
}

function closeModalFunction() {
    const formModal = document.querySelector("section.form");
    const form = document.querySelector("form");
    formModal.style.display = "none";
    form.reset();
}

function displayBooks() {
    myBooks.forEach(createBookCard);
}

function createBookCard(book) {
    const secondSection = document.querySelector("section.second-section");
    div = document.createElement("div");
    para1 = document.createElement("p");
    para2 = document.createElement("p");
    para3 = document.createElement("p");
    button1 = document.createElement("button");
    button2 = document.createElement("button");
    para1.textContent = book.title;
    para2.textContent = book.author;
    para3.textContent = book.pages;
    button1.textContent = book.read;
    button2.textContent = "Delete Book";
    div.appendChild(para1);
    div.appendChild(para2);
    div.appendChild(para3);
    div.appendChild(button1);
    div.appendChild(button2);
    div.setAttribute("class", "book-list");
    div.setAttribute("data-uniqueAttr", book.uniqueAttr);
    secondSection.appendChild(div);
    activateCardButtons(div);
}

function activateCardButtons(div) {
    const readButton = div.querySelector("button:first-of-type");
    readButton.addEventListener("click", readButtonEventHandler);
    const deleteButton = div.querySelector("button:last-of-type");
    deleteButton.addEventListener("click", deleteButtonEventHandler);    
}

function deleteButtonEventHandler() {
    const secondSection = document.querySelector("section.second-section");
    const uniqueAttr = this.parentElement.getAttribute("data-uniqueAttr");
    const index = myBooks.findIndex(book => book.uniqueAttr === +uniqueAttr);
    myBooks.splice(index, 1);
    secondSection.removeChild(this.parentElement);
}

function readButtonEventHandler() {
    const uniqueAttr = this.parentElement.getAttribute("data-uniqueAttr");
    const index = myBooks.findIndex(book=> book.uniqueAttr === +uniqueAttr);
    if (this.textContent === "read") {
        this.textContent = "not read yet";
    }
    else {
        this.textContent = "read";
    }
    myBooks[index].read = this.textContent;
}

displayBooks();