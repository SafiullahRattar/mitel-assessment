import { Component, effect, ElementRef, input, output, viewChild } from '@angular/core';
import { FEATURE_KEYS, FEATURE_LABELS_TO_SHOW, User } from '../user.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  imports: [TitleCasePipe],
  selector: 'app-user-drawer',
  styleUrl: './user-drawer.css',
  templateUrl: './user-drawer.html',
})
export class UserDrawer {
  readonly user = input<User | null>(null);

  readonly closed = output<void>();

  readonly featureKeys = FEATURE_KEYS;
  readonly featureLabels = FEATURE_LABELS_TO_SHOW;

  readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const el = this.dialog().nativeElement;
      if (this.user() && !el.open) el.showModal();
      if (!this.user() && el.open) el.close();
    });
  }

  protected closeOnBackDrop(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.dialog().nativeElement.close();
    }
  }
}
