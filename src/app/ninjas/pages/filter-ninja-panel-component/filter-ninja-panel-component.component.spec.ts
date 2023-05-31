import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterNinjaPanelComponentComponent } from './filter-ninja-panel-component.component';

describe('FilterNinjaPanelComponentComponent', () => {
  let component: FilterNinjaPanelComponentComponent;
  let fixture: ComponentFixture<FilterNinjaPanelComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterNinjaPanelComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterNinjaPanelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
