export class Observable {
  // A function that takes a value and returns void
  subscribe: (value: any) => void;

  constructor(subscribe) {
    this.subscribe = subscribe;
  }

  // This is a static function that returns an observable.
  static fromEvent(element, name) {
    // New up an observable, passing an inline subscribe 
    // function to the observable class constructor. The
    // subscribe function takes an observer parameter,
    // which is an object literal with a next key whose
    // value is the next function callback.  The component
    // that receives the returned observable will call the
    // subscribe function and pass the observer to it.
    return new Observable((observer) => {
      // Define the callback that's invoked from the producer,
      // which, in this case, is the browser's event system.
      // When the producer callback is invoked, we'll turn
      // around and invoke the observer's next function,
      // which is also a callback.  In other words, the
      // observable relays data emitted by the producer
      // to the calling component (the observer).
      const callback = (event) => observer.next(event);
      // Add a listener to for input events, passing in the callback
      element.addEventListener(name, callback, false);
      // Return the unsubscribe function
      return () => element.removeEventListener(name, callback, false);
    });
  }
}
