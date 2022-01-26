let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    if (this.read === true) {
      this.read = false;
      return this.read;
    }
    return (this.read = true);
  }
}

//Constructor function that makes "Book" objects.
/* function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
Book.prototype.toggleReadStatus = function () {
    if (this.read === true) {
        this.read = false;
        return this.read;
    }
    return this.read = true;
}
} */

const addButton = (() => {
  const button = document.getElementById('addBtn');
  button.addEventListener('click', function () {
    checkForm();
  });
})();

//Create a switch do toggle theme.
const themeSwitch = () => {
  const flipSwitch = document.getElementById('theme-toggle');
  flipSwitch.addEventListener('click', () => {
    changeTheme();
  });
};

//Change theme  for Header, Body and Footer sections.
const changeTheme = () => {
  const topHeader = document.getElementById('myHeader');
  const bookShelf = document.getElementById('shelf');
  const bottomFooter = document.getElementById('myFooter');
  const inputWindow = document.getElementById('inputFields');
  topHeader.classList.toggle('darkmode');
  bookShelf.classList.toggle('darkmode');
  bottomFooter.classList.toggle('darkmode');
  inputWindow.classList.toggle('darkmode');
};

//Displays Book-Objects stored in myLibrary-Array.
//Creates variables for div-elements that are used to create the actual Book-object items from the myLibrary-Array.
//Adds classes to those created elements.
const displayLibrary = () => {
  const bookShelf = document.getElementById('shelf');
  let nClose = document.createElement('div');
  nClose.classList.add('close');
  let nBook = document.createElement('div');
  nBook.classList.add('book');
  let mTitle = document.createElement('div');
  mTitle.classList.add('titlehead');
  let nTitle = document.createElement('div');
  nTitle.classList.add('title');
  let mAuthor = document.createElement('div');
  mAuthor.classList.add('authorhead');
  let nAuthor = document.createElement('div');
  nAuthor.classList.add('author');
  let mPages = document.createElement('div');
  mPages.classList.add('pageshead');
  let nPages = document.createElement('div');
  nPages.classList.add('pages');
  let mRead = document.createElement('div');
  mRead.classList.add('readhead');
  let nRead = document.createElement('input');
  nRead.setAttribute('type', 'checkbox');
  nRead.classList.add('read');

  //Loop over myLibrary-Array and grab the corresponsing values/text.
  for (let i = 0; i < myLibrary.length; i++) {
    nClose.textContent = 'X';
    mTitle.textContent = 'Title:';
    nTitle.textContent = myLibrary[i].title;
    mAuthor.textContent = 'Author:';
    nAuthor.textContent = myLibrary[i].author;
    mPages.textContent = 'Pages:';
    nPages.textContent = myLibrary[i].pages;
    mRead.textContent = 'Finished';
    nRead.textContent = myLibrary[i].read;
    //Create the above defined Elements on the Webpage for every loop.
    bookShelf.appendChild(nBook);
    nBook.setAttribute('id', myLibrary.indexOf(myLibrary[i])); // use this ID to grab the object in the array and perform operations on it
    nBook.appendChild(nClose);
    nBook.appendChild(mTitle);
    nBook.appendChild(nTitle);
    nBook.appendChild(mAuthor);
    nBook.appendChild(nAuthor);
    nBook.appendChild(mPages);
    nBook.appendChild(nPages);
    nBook.appendChild(mRead);
    nBook.appendChild(nRead);
    if (this.read === true) {
      nRead.setAttribute('checked', 'true');
      nBook.classList.add('markRead');
    }
  }
  activateRemoveButton();
  readToggleListener();
};

//Get input field values and push them to myLibary-Array.
const addBookToLibary = () => {
  let newTitle = document.getElementById('titleInput').value;
  let newAuthor = document.getElementById('authorInput').value;
  let newPages = document.getElementById('pagesInput').value;
  checkRead();

  let newBook = new Book(newTitle, newAuthor, newPages, read);

  myLibrary.push(newBook);
  displayLibrary();
  clearInput();
  populateStorage();
};

//Clear input fields after input.
const clearInput = () => {
  document.getElementById('titleInput').value = '';
  document.getElementById('authorInput').value = '';
  document.getElementById('pagesInput').value = '';
  document.getElementById('readCheck').value = '';
  document.getElementById('readCheck').checked = false;
  hideInputs();
};

//Check if entered book is already read or not.
const checkRead = () => {
  if (document.getElementById('readCheck').checked === true) {
    return (read = true);
  } else {
    return (read = false);
  }
};

//Add an eventListener to the new book button.
const getNewBookButton = document.getElementById('newBookButton');
getNewBookButton.addEventListener('click', () => {
  showInputs();
});

//Show hidden input fields for a popup-like effect.
const showInputs = () => {
  document.getElementById('inputFields').classList.remove('hidden');
};

//Hide input fields ffor a popup-like effect.
const hideInputs = () => {
  document.getElementById('inputFields').classList.add('hidden');
};

//Add an eventListener for every< button with the .close-class.
const activateRemoveButton = () => {
  document.querySelectorAll('.close').forEach((button) => {
    button.addEventListener('click', removeBookHelper); // ID of the corresponding Book object. Use this ID to target the corresponding object in the myLibrary-Array
  });
};

//Helper function that passes the ID of the clicked elements parent node (clicked elements is one of the close buttons, which is a child of its parent "book".)
const removeBookHelper = (item) => {
  removeBook(item.target.parentNode.id);
};

//Remove a book from myLibrary Array.
//Removes the element with the accorgind ID from the DOM.
//Uses the ID from the removeBookHelper-functino to splice the myLibrary-array at the according position.
const removeBook = (parentNodeID) => {
  document.getElementById(parentNodeID).remove();
  myLibrary.splice(parentNodeID, 1);
  populateStorage();
  return myLibrary;
};

//Attach eventListeners on all .read-checkboxes
const readToggleListener = () => {
  document.querySelectorAll('.read').forEach((checkbox) => {
    checkbox.addEventListener('click', readStatusHelper);
  });
};

//Toggles amd "markRead"-class on selected elements parent node.
//Run prototype function toggleReadStatus on myLibrary-Array item with corresponding ID.
const readStatusHelper = (item) => {
  item.target.parentNode.classList.toggle('markRead');
  myLibrary[item.target.parentNode.id].toggleReadStatus();
  populateStorage();
  return myLibrary;
};

//Saves myLibrary contents as JSON to localstorage.
const populateStorage = () => {
  let storageString = JSON.stringify(myLibrary);
  localStorage.setItem('localShelf', storageString);
};

//Retrieves JSON from localstorage and parses it into an array.
//Creates an empty array, if localstorace is empty.
// !!! Data parsed from localstorage gets parsed as an array with all the items of the Book-object but NOT AS AN ACTUAL BOOK-objects as created per constructor function!
const retrieveStorage = () => {
  let retrievedStorageString = localStorage.getItem('localShelf');
  storageData = JSON.parse(retrievedStorageString) || [];
  mapData();
};

//Maps storageData-Array and converts the items in actuial Book-objects via the constructor-function.
const mapData = () => {
  myLibrary = storageData.map(
    (data) => new Book(data.title, data.author, data.pages, data.read)
  );
};

//Displays all Books in myLibrary upon start.
const initialLibrary = () => {
  const bookShelf = document.getElementById('shelf');
  for (let i = 0; i < myLibrary.length; i++) {
    let nClose = document.createElement('div');
    nClose.classList.add('close');
    let nBook = document.createElement('div');
    nBook.classList.add('book');
    let mTitle = document.createElement('div');
    mTitle.classList.add('titlehead');
    let nTitle = document.createElement('div');
    nTitle.classList.add('title');
    let mAuthor = document.createElement('div');
    mAuthor.classList.add('authorhead');
    let nAuthor = document.createElement('div');
    nAuthor.classList.add('author');
    let mPages = document.createElement('div');
    mPages.classList.add('pageshead');
    let nPages = document.createElement('div');
    nPages.classList.add('pages');
    let mRead = document.createElement('div');
    mRead.classList.add('readhead');
    let nRead = document.createElement('input');
    nRead.setAttribute('type', 'checkbox');
    nRead.classList.add('read');
    nClose.textContent = 'X';
    mTitle.textContent = 'Title:';
    nTitle.textContent = myLibrary[i].title;
    mAuthor.textContent = 'Author:';
    nAuthor.textContent = myLibrary[i].author;
    mPages.textContent = 'Pages:';
    nPages.textContent = myLibrary[i].pages;
    mRead.textContent = 'Finished';
    nRead.textContent = myLibrary[i].read;
    bookShelf.appendChild(nBook);
    nBook.setAttribute('id', myLibrary.indexOf(myLibrary[i])); // use this ID to grab the object in the array and to operations on it
    nBook.appendChild(nClose);
    nBook.appendChild(mTitle);
    nBook.appendChild(nTitle);
    nBook.appendChild(mAuthor);
    nBook.appendChild(nAuthor);
    nBook.appendChild(mPages);
    nBook.appendChild(nPages);
    nBook.appendChild(mRead);
    nBook.appendChild(nRead);
    if (myLibrary[i].read === true) {
      nRead.setAttribute('checked', 'true');
      nBook.classList.add('markRead');
    }
  }
  activateRemoveButton();
  readToggleListener();
};

//prevent submitting empty fields
const checkForm = () => {
  const title = document.getElementById('titleInput');
  const author = document.getElementById('authorInput');
  const pages = document.getElementById('pagesInput');

  title.value === ''
    ? alert('Enter a title')
    : author.value === ''
    ? alert('Enter an author')
    : pages.value === ''
    ? alert('Enter pages')
    : addBookToLibary();
};

//On page load: retrieve data stored in localstorage > display all items in myLibrary > activate theme-switch functionality.
retrieveStorage();
initialLibrary();
themeSwitch();
