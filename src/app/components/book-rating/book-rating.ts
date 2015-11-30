import { Component, View} from 'angular2/angular2';
import { Control } from 'angular2/angular2';
import BookComponent from '../book-component/book-component';
import Book from '../../models/book';
import BooksApi from '../../core/books-api';

@Component({
  selector: 'book-rating'
})
@View({
  template: `
  <div class="form">
     <div class="form-group">
       <div><label for="title">Title</label></div>
       <div><input class="form-control" name="title" #title></div>
     </div>
     <div class="form-group">
       <div><label for="link">Comment</label></div>
       <div><textarea class="form-control" name="comment" #comment></textarea></div>
     </div>
     <div class="form-group">
      <button (click)="add(title, comment)" class="btn btn-danger">Submit</button>
     </div>
   </div>

   <hr>
   <book *ng-for="#book of books"
         [buch]="book"
         (rated)="reorderBooks(book)"></book>
  `,
  directives: [BookComponent]
})
export default class BookRating {
  books: Array<Book>;

  constructor(books: BooksApi) {
    this.books = books.all();
  }

  add(title: Control, comment: Control) {
    this.books.push(
      new Book(title.value, comment.value)
    );

    title.value = '';
    comment.value = '';
  }

  reorderBooks(book: Book) {
    this.books.sort((a, b) => b.rating - a.rating);
  }
}
