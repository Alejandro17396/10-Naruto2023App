import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogAddFormationComponent } from './confirm-dialog-add-formation.component';

describe('ConfirmDialogAddFormationComponent', () => {
  let component: ConfirmDialogAddFormationComponent;
  let fixture: ComponentFixture<ConfirmDialogAddFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogAddFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogAddFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
