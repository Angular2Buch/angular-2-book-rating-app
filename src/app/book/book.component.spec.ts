import {
  beforeEach,
  beforeEachProviders,
  describe, fdescribe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component, provide } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BookComponent } from './book.component';
import { Book } from '../shared';


/* workparound, see https://github.com/angular/vladivostok/issues/45  */
import { Router, ActivatedRoute } from '@angular/router';
class MockRouter { createUrlTree() {} }
class MockActivatedRoute { }

beforeEachProviders(() => [
  provide(Router, { useClass: MockRouter }),
  provide(ActivatedRoute, { useClass: MockActivatedRoute })
]);
/* workaround */



describe('Component: Book', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [BookComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

it('should fire rated-event on rateUp click', () => {
    return builder
      .createAsync(BookComponent)
      .then((fixture) => {

        // given a component instance with an initialized book input
        var book: BookComponent = fixture.componentInstance;
        book.book = new Book('Test Title', 'Test Comment');

        // we fake the event emitter with a spy
        spyOn(book.rated, 'emit');

        // when we click on rateUp button
        var button = fixture.nativeElement.querySelector('button:first-of-type');
        button.dispatchEvent(new Event('click'));

        // we trigger the change detection
        fixture.detectChanges();

        // then the event emitter should have fired an event
        expect(book.rated.emit).toHaveBeenCalled();
      });
  });
});

@Component({
  selector: 'test',
  template: `
    <br-book></br-book>
  `,
  directives: [BookComponent]
})
class BookComponentTestController {
}
