import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareAccesoriesComponent } from './compare-accesories.component';

describe('CompareAccesoriesComponent', () => {
  let component: CompareAccesoriesComponent;
  let fixture: ComponentFixture<CompareAccesoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareAccesoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareAccesoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
