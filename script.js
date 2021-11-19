const myLibrary = [];
const testBook = new Book("Moby Dick", "Hermann Melivlle", 808, "already red");
const testBook2 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not red yet");

let newTitle;
let newAuthor;
let newPages;
let newRead;

//Constructor function that makes "Book" objects.
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Get input field values and pushed them to myLibary-Array.
function addBookToLibary() {

    newTitle = document.getElementById("titleInput").value;
    newAuthor = document.getElementById("authorInput").value;
    newPages = document.getElementById("pagesInput").value;
    newRead = document.getElementById("readCheck").value;

    let newBook = new Book(newTitle, newAuthor, newPages, newRead);

    myLibrary.push(newBook);
    displayLibary();
    clearInput();
}

//Displays book in myLibary-Array.
function displayLibary() {
    const para = document.createElement("P");
    para.innerText = "";
    for (let i = 0; i < myLibrary.length; i++) {
        para.innerText = myLibrary[i].title + myLibrary[i].author + myLibrary[i].pages + myLibrary[i].read;
        document.body.appendChild(para);
    }
}

//Clear input fields after input.
function clearInput() {
    document.getElementById("titleInput").value = "";
    document.getElementById("authorInput").value = "";
    document.getElementById("pagesInput").value = "";
    document.getElementById("readCheck").value = "";
}