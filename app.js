/*===============
GLOBAL VARIABLES
===============*/
const bookForm = document.getElementById('book-form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const isbn = document.getElementById('isbn');
const list = document.getElementById('book-list');
const main = document.querySelector('main');

/*==========
CLASSES
==========*/

// Book Class
class Book {

  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }


}

// UI Class
class UI {

  addBookToList(book) {
    // create table row
    const row = document.createElement('tr');
    // insert table data
    row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="delete">X</a></td>`;

    // append row
    list.appendChild(row);
  }

  showAlert(msg, className) {
    // create div
    const div = document.createElement('div');

    // add classes
    div.className = `alert ${className}`;

    // add text
    div.appendChild(document.createTextNode(msg));

    // insert div
    main.insertBefore(div, bookForm);

    // timeout after 3 secs
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    title.value = '';
    author.value = '';
    isbn.value = '';
  }

}

// Local Storage Class
class Store {
  static getBooks() {
    // initialize books array
    let books;
    // if null empty array, otherwise add books
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    // get books
    const books = Store.getBooks();

    // Instance of UI
    const ui = new UI();

    // display books
    for (let book of books) {
      ui.addBookToList(book)
    }
  }

  static addBook(book) {
    // get books
    const books = Store.getBooks();

    // push the book added into books
    books.push(book);
    // set it in local storage
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    // get books
    const books = Store.getBooks();

    // find the book and remove it
    for (let book of books) {
      if (book.isbn === isbn) {
        books.splice(book, 1);
      }
    }

    localStorage.setItem('books', JSON.stringify(books));
  }
}


/*================
FUNCTIONS
================*/

function validate(ui, book) {

  // check if form fields are empty
  if (title.value === '' || author.value === '' || isbn.value === '') {
    // alert error msg
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // add the book
    ui.addBookToList(book);

    // add to local storage
    Store.addBook(book);

    // show success
    ui.showAlert('Book added!', 'success');

    // clear form fields
    ui.clearFields();
  }
}

/*================
EVENT LISTENERS
================*/

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Listen for Submit
bookForm.addEventListener('submit', function (e) {

  // instance of book object
  const book = new Book(title.value, author.value, isbn.value);

  // instance of UI object
  const ui = new UI();

  // validate
  validate(ui, book);

  e.preventDefault();
});

// Listen for delete
list.addEventListener('click', function (e) {

  // instance of UI
  const ui = new UI();

  // delete book
  ui.deleteBook(e.target);

  // remove book from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // show alert
  ui.showAlert('Book deleted!', 'success');

  e.preventDefault();

});