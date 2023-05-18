import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogSetComponent } from './confirm-dialog-set.component';

describe('ConfirmDialogSetComponent', () => {
  let component: ConfirmDialogSetComponent;
  let fixture: ComponentFixture<ConfirmDialogSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
