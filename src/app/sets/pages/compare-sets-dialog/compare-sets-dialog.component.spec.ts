import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareSetsDialogComponent } from './compare-sets-dialog.component';

describe('CompareSetsDialogComponent', () => {
  let component: CompareSetsDialogComponent;
  let fixture: ComponentFixture<CompareSetsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareSetsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareSetsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
