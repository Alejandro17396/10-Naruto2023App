import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserFormationComponent } from './create-user-formation.component';

describe('CreateUserFormationComponent', () => {
  let component: CreateUserFormationComponent;
  let fixture: ComponentFixture<CreateUserFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
