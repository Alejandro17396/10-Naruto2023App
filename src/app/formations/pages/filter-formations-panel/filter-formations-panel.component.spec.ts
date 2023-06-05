import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFormationsPanelComponent } from './filter-formations-panel.component';

describe('FilterFormationsPanelComponent', () => {
  let component: FilterFormationsPanelComponent;
  let fixture: ComponentFixture<FilterFormationsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterFormationsPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterFormationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
