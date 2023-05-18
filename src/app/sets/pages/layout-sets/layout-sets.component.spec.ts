import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSetsComponent } from './layout-sets.component';

describe('LayoutSetsComponent', () => {
  let component: LayoutSetsComponent;
  let fixture: ComponentFixture<LayoutSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutSetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
