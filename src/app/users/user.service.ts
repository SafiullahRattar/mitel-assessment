import { httpResource } from '@angular/common/http';
import { computed, Service } from '@angular/core';
import { User } from './user.model';

@Service()
export class UserService {
  private db = httpResource<{ users: User[] }>(() => 'db.json');

  readonly users = computed(() => (this.db.hasValue() ? this.db.value().users : []));
  readonly loading = this.db.isLoading;
  readonly error = this.db.error;


  reload(){
    this.db.reload();
  }
}
