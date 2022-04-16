import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `<div class="container-center">{{ 'notFoundErrorMessage' | appLocale }}</div>`
})
export class AppNotFoundComponent {}
