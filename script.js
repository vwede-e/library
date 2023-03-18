const myBooks = [
    {title: "Wedlock of the Gods", author: "Zulu Sofola", pages: 250, read: "not read yet", uniqueAttr: 0},
    {title: "Lord of the Rings", author: "J.R.R. Tolkien", pages: 320, read: "read", uniqueAttr: 1},
    {title: "The Gods Must Be Crazy", author: "Jamie Uys", pages: 198, read: "not read", uniqueAttr: 2 },
]; 

const addBookButton = document.querySelector("button.add-new-book");
const submitButton = document.querySelector('button[type="submit"]');
const closeModal = document.querySelector("span");
addBookButton.addEventListener("click", showFormModal);

function showFormModal() {
    const formModal = document.querySelector("section.form");
    formModal.style.display = "flex";
    submitButton.addEventListener("click", hideFormModal);
    closeModal.addEventListener("click", hideFormModal);
    }

function createNewBook() {
    const newTitle = document.querySelector('input[id="title"]').value;
    const newAuthor = document.querySelector('input[id="author"]').value;
    const newPages = document.querySelector('input[id="pages"]').value;
    const check = document.querySelector('input[id="read"]').checked;
    const newRead = check === true ? "read" : "not read yet";  
    const newBook = new Book(newTitle, newAuthor, newPages, newRead);
    myBooks.push(newBook);
    displayBooks();
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uniqueAttr = myBooks.length;
}

function hideFormModal(event) {
    const formModal = document.querySelector("section.form");
    formModal.style.display = "none";
    const form = document.querySelector("form");
    if (this === closeModal) {
        form.reset();
        return
    }
    submitButton.removeEventListener("click", hideFormModal);
    createNewBook();
    form.reset();
}

function displayBooks() {
    const secondSection = document.querySelector("section.second-section");
    while (secondSection.firstElementChild) {
        secondSection.removeChild(secondSection.firstElementChild);
    }
    myBooks.forEach(book=> {
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
        activateCardButtons();
    })
}

function activateCardButtons() {
    const deleteList = document.querySelectorAll("section.second-section div button:last-of-type");
    deleteList.forEach((button)=> button.addEventListener("click", deleteButtonsEventHandler))
    const readList = document.querySelectorAll("section.second-section div button:first-of-type");
    readList.forEach((button)=> button.addEventListener("click", readButtonsEventHandler));
}

function deleteButtonsEventHandler() {
    const secondSection = document.querySelector("section.second-section");
    const uniqueAttr = this.parentElement.getAttribute("data-uniqueAttr");
    index = myBooks.findIndex(book => book.uniqueAttr === +uniqueAttr);
    myBooks.splice(index, 1);
    secondSection.removeChild(this.parentElement);
}

function readButtonsEventHandler() {
    const uniqueAttr = this.parentElement.getAttribute("data-uniqueAttr");
    index = myBooks.findIndex(book=> book.uniqueAttr === +uniqueAttr);
    if (this.textContent === "read") {
        this.textContent = "not read yet";
    }
    else {
        this.textContent = "read";
    }
    myBooks[index].read = this.textContent;
}

displayBooks();