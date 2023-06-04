import { Component, OnInit, VERSION } from '@angular/core';
import { Observable } from './observable';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  node: HTMLInputElement;
  p: HTMLParagraphElement;
  input$: Observable;
  unsubscribe: any;

  ngOnInit() {
    // Select the input element in the UI
    // This is where we'll produce the observable stream
    this.node = document.querySelector('input');
    // Select the paragraph element in the UI
    // This is where we'll display the observable stream
    this.p = document.querySelector('p');
    // Call the statick event on our observable class
    // This method will return a new observable
    // This method would normally be in another class,
    // but we want to keep in simple
    this.input$ = Observable.fromEvent(this.node, 'input');
    // Pass the observer object literal in the subscribe function
    this.unsubscribe = this.input$.subscribe({
      next: (event) => {
        this.p.innerHTML = event.target.value;
      },
    });
  }

  ngOnDestroy() {
    this.unsubscribe;
  }
}
