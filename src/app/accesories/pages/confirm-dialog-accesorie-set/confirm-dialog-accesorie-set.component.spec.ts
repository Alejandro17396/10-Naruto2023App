import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogAccesorieSetComponent } from './confirm-dialog-accesorie-set.component';

describe('ConfirmDialogAccesorieSetComponent', () => {
  let component: ConfirmDialogAccesorieSetComponent;
  let fixture: ComponentFixture<ConfirmDialogAccesorieSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogAccesorieSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogAccesorieSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
