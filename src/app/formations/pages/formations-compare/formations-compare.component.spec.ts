import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationsCompareComponent } from './formations-compare.component';

describe('FormationsCompareComponent', () => {
  let component: FormationsCompareComponent;
  let fixture: ComponentFixture<FormationsCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationsCompareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationsCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
