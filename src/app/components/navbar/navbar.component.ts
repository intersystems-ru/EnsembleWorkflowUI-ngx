import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor() { }

  // to logout we just redirect user to base-ref with standard Caché parameter for logout
  logout () {
    window.location.href = '?CacheLogout=1';
  }
}
