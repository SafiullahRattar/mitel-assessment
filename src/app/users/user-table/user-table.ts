import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FEATURE_KEYS, FEATURE_LABELS_TO_SHOW, User } from '../user.model';

@Component({
  imports: [TitleCasePipe],
  selector: 'app-user-table',
  styleUrl: './user-table.css',
  templateUrl: './user-table.html',
})
export class UserTable {
  readonly users = input.required<User[]>();

  readonly featureKeys = FEATURE_KEYS;
  readonly featureLabels = FEATURE_LABELS_TO_SHOW;

}
