import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet />
    <app-toast />
  `,
  standalone: false,
})
export class App {
  protected readonly title = signal('Semogly');
}
