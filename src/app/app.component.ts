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
    //this.node = document.querySelector('input');
    console.log('node', this.node);
    this.p = document.querySelector('p');
    console.log('p', this.p);
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
