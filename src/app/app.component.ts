import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-root',
  imports: [ HeaderComponent,NavbarComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
}
