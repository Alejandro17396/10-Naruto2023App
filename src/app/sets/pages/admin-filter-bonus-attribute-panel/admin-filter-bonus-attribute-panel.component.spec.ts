import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilterBonusAttributePanelComponent } from './admin-filter-bonus-attribute-panel.component';

describe('AdminFilterBonusAttributePanelComponent', () => {
  let component: AdminFilterBonusAttributePanelComponent;
  let fixture: ComponentFixture<AdminFilterBonusAttributePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFilterBonusAttributePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFilterBonusAttributePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
