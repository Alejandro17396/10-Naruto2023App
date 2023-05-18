import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareSetsComponent } from './compare-sets.component';

describe('CompareSetsComponent', () => {
  let component: CompareSetsComponent;
  let fixture: ComponentFixture<CompareSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareSetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
