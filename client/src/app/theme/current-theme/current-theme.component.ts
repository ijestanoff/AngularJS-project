import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/theme';
import { UserService } from '../../user/user.service';
import { HomeComponent } from '../../home/home.component';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-current-theme',
  standalone: true,
  imports: [HomeComponent, DatePipe, FormsModule],
  templateUrl: './current-theme.component.html',
  styleUrl: './current-theme.component.css'
})
export class CurrentThemeComponent implements OnInit {
  theme = {} as Theme;
  isEditMode: boolean = false;
  postId: string = '';
  postText: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  toggleEditMode(event: Event, postId: string, postText: string) {
    event.preventDefault();
    this.isEditMode = !this.isEditMode;
    this.postId = postId;
    this.postText = postText;
  }

  addComment(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { postText } = form.value;

    this.apiService.createPost(this.theme._id, postText).subscribe(() => {
      this.router.navigateByUrl('/themes', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/themes', this.theme._id]);
      });
    });
  }

  editComment(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { postText } = form.value;

    this.apiService.updatePost(this.theme._id, this.postId, postText).subscribe(() => {
      this.router.navigateByUrl('/themes', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/themes', this.theme._id]);
      });
    });
  }

  onDelete(event: Event, postId: string) {
    event.preventDefault();
    console.log(this.theme._id, postId);

    this.apiService.deletePost(this.theme._id, postId).subscribe(() => {
      this.router.navigateByUrl('/themes', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/themes', this.theme._id]);
      });
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['themeId'];

    this.apiService.getSingleTheme(id).subscribe(theme => {
      this.theme = theme;
    });
  }
}
