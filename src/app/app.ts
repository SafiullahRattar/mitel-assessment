import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './users/user.service';
import { UserTable } from './users/user-table/user-table';

@Component({
  imports: [UserTable],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly srvc = inject(UserService);
}
