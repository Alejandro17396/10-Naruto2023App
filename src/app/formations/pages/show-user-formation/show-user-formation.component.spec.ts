import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserFormationComponent } from './show-user-formation.component';

describe('ShowUserFormationComponent', () => {
  let component: ShowUserFormationComponent;
  let fixture: ComponentFixture<ShowUserFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUserFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowUserFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
