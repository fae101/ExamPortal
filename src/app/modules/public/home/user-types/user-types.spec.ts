import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypes } from './user-types';

describe('UserTypes', () => {
  let component: UserTypes;
  let fixture: ComponentFixture<UserTypes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTypes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTypes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
