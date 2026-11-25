import { TitleCasePipe } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { FEATURE_KEYS, FEATURE_LABELS_TO_SHOW, User } from '../user.model';

type View = 'all' | 'active' | 'inactive';

const VIEWS: { key: View; label: string; test: (u: User) => boolean }[] = [
  { key: 'all', label: 'All', test: () => true },
  { key: 'active', label: 'Active', test: (u) => u.plan.status === 'active' },
  { key: 'inactive', label: 'Inactive', test: (u) => u.plan.status === 'inactive' },
];
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

  readonly plan = signal('');
  readonly search = signal('');
  readonly view = signal<View>('all');
  readonly tabs = computed(() =>
    VIEWS.map((v) => ({ ...v, count: this.users().filter(v.test).length })),
  );
  readonly rows = computed(() => {
    const inView = VIEWS.find((v) => v.key === this.view())!.test;
    const query = this.search().trim().toLowerCase();
    return this.users().filter(
      (user) =>
        inView(user) &&
        (!this.plan() || user.plan.type === this.plan()) &&
        (!query ||
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)),
    );
  });
}
