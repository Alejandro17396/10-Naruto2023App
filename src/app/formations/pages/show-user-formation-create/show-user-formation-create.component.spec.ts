import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserFormationCreateComponent } from './show-user-formation-create.component';

describe('ShowUserFormationCreateComponent', () => {
  let component: ShowUserFormationCreateComponent;
  let fixture: ComponentFixture<ShowUserFormationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUserFormationCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowUserFormationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
