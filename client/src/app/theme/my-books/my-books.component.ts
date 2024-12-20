import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/theme';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [LoaderComponent, RouterLink, SlicePipe, DatePipe],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.css'
})
export class MyBooksComponent implements OnInit {
  themes: Theme[] = [];
  myThemes: Theme[] = [];
  isLoading = true;

  constructor(private userService: UserService, private apiService: ApiService) { }

  get username(): string {
    return this.userService.user?.username || '';
  }

  ngOnInit() {
    this.apiService.getThemes().subscribe(themes => {
      this.themes = themes;
      this.themes.forEach(theme => {
        if (theme.userId.username == (this.userService.user?.username || '')) {
          this.myThemes.push(theme);
        }
      });
      this.isLoading = false;
    });
  }
}