import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/theme';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [LoaderComponent,RouterLink, SlicePipe, DatePipe],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  themes: Theme[] = [];
  isLoading = true;

  constructor(private userService: UserService, private apiService: ApiService) {}

  get username():string {
    return this.userService.user?.username || '';
  }

  ngOnInit() {
    this.apiService.getThemes().subscribe(themes => {
      this.themes = themes
        .sort((a,b) => Date.parse(b.created_at) -  Date.parse(a.created_at))
        .slice(-3);
      this.isLoading = false;
    });
  }
}