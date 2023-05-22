import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAccesorieSetDifferencesComponent } from './view-accesorie-set-differences.component';

describe('ViewAccesorieSetDifferencesComponent', () => {
  let component: ViewAccesorieSetDifferencesComponent;
  let fixture: ComponentFixture<ViewAccesorieSetDifferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAccesorieSetDifferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAccesorieSetDifferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
