import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserFormationComponent } from './view-user-formation.component';

describe('ViewUserFormationComponent', () => {
  let component: ViewUserFormationComponent;
  let fixture: ComponentFixture<ViewUserFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
