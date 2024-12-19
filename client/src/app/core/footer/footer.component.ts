import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  get isLoggedIn():boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService, private router: Router) {}

  logout() {
    this.userService.logout()
      .subscribe(() => {
        this.router.navigate(['/login'])
      })
  }
}