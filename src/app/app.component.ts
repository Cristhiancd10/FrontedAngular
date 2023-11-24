import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontedAppAngular';

  constructor(private authService: UsersService, private router:Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
    // Redirigir al usuario a la página de inicio de sesión
    // o a otra página que desees
    // Ejemplo:
    // this.router.navigate(['/login']);
  }
}
