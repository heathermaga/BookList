class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
  }



  showAlert(message, className) {
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

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('ISBN').value = '';
  }

}

// Locak storage class
class Store {

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function (book) {
      const ui = new UI;
      ui.addBookToList(book);
    });
  }


  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

}

//Event Listeners

// dom load event
document.addEventListener('DOMContentLoaded', Store.displayBooks());

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
    Store.addBook(book);
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
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  //success alert
  ui.showAlert('Book Removed', 'success');
  e.preventDefault();
});