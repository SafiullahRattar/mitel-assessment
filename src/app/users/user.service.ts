import { httpResource } from '@angular/common/http';
import { computed, Service } from '@angular/core';
import { PLAN_DESCRIPTIONS, RawUser, User } from './user.model';

@Service()
export class UserService {
  private db = httpResource<{ users: User[] }>(() => 'db.json');

  readonly users = computed(() => (this.db.hasValue() ? addWarnings(this.db.value().users) : []));
  readonly loading = this.db.isLoading;
  readonly error = this.db.error;

  reload() {
    this.db.reload();
  }
}

export function addWarnings(users: RawUser[]): User[] {
  return users.map((user) => {
    const warnings: string[] = [];
    const sameId = users.filter((other) => other.id === user.id).length;
    if (sameId > 1) {
      warnings.push('Duplicate ID detected');
    }

    const expected = PLAN_DESCRIPTIONS[user.plan.type];
    if (user.plan.description !== expected) {
      warnings.push(
        `Plan is "${user.plan.type}" but the description says "${user.plan.description}"`,
      );
    }
    return {...user, warnings};
  });
}
