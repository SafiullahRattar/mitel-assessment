import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDrawer } from './user-drawer';

describe('UserDrawer', () => {
  let component: UserDrawer;
  let fixture: ComponentFixture<UserDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDrawer],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDrawer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
