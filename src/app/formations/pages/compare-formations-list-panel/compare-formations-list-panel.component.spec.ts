import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareFormationsListPanelComponent } from './compare-formations-list-panel.component';

describe('CompareFormationsListPanelComponent', () => {
  let component: CompareFormationsListPanelComponent;
  let fixture: ComponentFixture<CompareFormationsListPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareFormationsListPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareFormationsListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
