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

class Book {

  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }


}

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

    // show success
    ui.showAlert('Book added!', 'success');

    // clear form fields
    ui.clearFields();
  }
}

/*================
EVENT LISTENERS
================*/

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

  ui.deleteBook(e.target);

  // show alert
  ui.showAlert('Book deleted!', 'success');

  e.preventDefault();

});