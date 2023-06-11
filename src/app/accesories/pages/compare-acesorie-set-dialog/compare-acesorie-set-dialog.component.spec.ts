import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareAcesorieSetDialogComponent } from './compare-acesorie-set-dialog.component';

describe('CompareAcesorieSetDialogComponent', () => {
  let component: CompareAcesorieSetDialogComponent;
  let fixture: ComponentFixture<CompareAcesorieSetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareAcesorieSetDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareAcesorieSetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
