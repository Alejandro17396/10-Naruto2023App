import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinjaCompareComponent } from './ninja-compare.component';

describe('NinjaCompareComponent', () => {
  let component: NinjaCompareComponent;
  let fixture: ComponentFixture<NinjaCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinjaCompareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinjaCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
