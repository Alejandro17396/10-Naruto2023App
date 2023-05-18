import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSetPanelComponent } from './filter-set-panel.component';

describe('FilterSetPanelComponent', () => {
  let component: FilterSetPanelComponent;
  let fixture: ComponentFixture<FilterSetPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterSetPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterSetPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
