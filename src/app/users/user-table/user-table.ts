import { TitleCasePipe } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { FEATURE_KEYS, FEATURE_LABELS_TO_SHOW, User } from '../user.model';

type View = 'all' | 'active' | 'inactive';
type SortKey = 'name' | 'age';

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
  readonly selectedId = input<string | null>(null);
  readonly userSelected = output<User>();

  readonly featureKeys = FEATURE_KEYS;
  readonly featureLabels = FEATURE_LABELS_TO_SHOW;

  readonly plan = signal('');
  readonly search = signal('');
  readonly view = signal<View>('all');
  readonly tabs = computed(() =>
    VIEWS.map((v) => ({ ...v, count: this.users().filter(v.test).length })),
  );

  readonly sortKey = signal<SortKey>('name');
  readonly sortDir = signal<1 | -1>(1);

  protected sortBy(key: SortKey) {
    if (this.sortKey() === key) {
      this.sortDir.update((d) => (d === 1 ? -1 : 1));
    } else {
      this.sortKey.set(key);
      this.sortDir.set(1);
    }
  }

  protected arrow(key: SortKey) {
    if (this.sortKey() !== key) return '↕';
    return this.sortDir() === 1 ? '↑' : '↓';
  }
  readonly rows = computed(() => {
    const inView = VIEWS.find((v) => v.key === this.view())!.test;
    const query = this.search().trim().toLowerCase();
    const key = this.sortKey();
    const dir = this.sortDir();
    return this.users()
      .filter(
        (user) =>
          inView(user) &&
          (!this.plan() || user.plan.type === this.plan()) &&
          (!query ||
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)),
      )
      .sort((a, b) => (key === 'age' ? a.age - b.age : a.name.localeCompare(b.name)) * dir);
  });


  protected clearFilters() {
    this.view.set('all');
    this.plan.set('');
    this.search.set('');
  }
}
