import { Component, computed, inject, signal } from '@angular/core';
import { UserService } from './users/user.service';
import { UserTable } from './users/user-table/user-table';
import { UserDrawer } from './users/user-drawer/user-drawer';
import { User } from './users/user.model';

@Component({
  imports: [UserTable, UserDrawer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly srvc = inject(UserService);

  protected readonly selected = signal<User | null>(null);
}
