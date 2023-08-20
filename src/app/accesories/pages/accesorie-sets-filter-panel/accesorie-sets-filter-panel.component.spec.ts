import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesorieSetsFilterPanelComponent } from './accesorie-sets-filter-panel.component';

describe('AccesorieSetsFilterPanelComponent', () => {
  let component: AccesorieSetsFilterPanelComponent;
  let fixture: ComponentFixture<AccesorieSetsFilterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesorieSetsFilterPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesorieSetsFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
