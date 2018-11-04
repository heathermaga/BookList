// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
// set of prototype methods
function UI() { }

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  //sert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);

}

UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('ISBN').value = '';
}

UI.prototype.showAlert = function (message, className) {
  //create div
  const div = document.createElement('div');
  // add classes
  div.className = `alert ${className}`;
  // add text message
  div.appendChild(document.createTextNode(message));
  // add to page
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);
  // remove after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}

UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

//Event Listeners
//event listener for adding book
document.getElementById('book-form').addEventListener('submit', function (e) {
  //get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('ISBN').value;

  const book = new Book(title, author, isbn);
  // Instantiate UI Object
  const ui = new UI();

  //validate
  if (title === '' || author === '' || isbn === '') {
    //error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    //Add book to list
    ui.addBookToList(book);
    //success alert
    ui.showAlert('Book Added', 'success');
    // Clear Fields
    ui.clearFields();
  }
  e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
  // Instantiate UI Object
  const ui = new UI();
  ui.deleteBook(e.target);
  //success alert
  ui.showAlert('Book Removed', 'success');
  e.preventDefault();
});