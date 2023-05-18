import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSetDifferencesComponent } from './view-set-differences.component';

describe('ViewSetDifferencesComponent', () => {
  let component: ViewSetDifferencesComponent;
  let fixture: ComponentFixture<ViewSetDifferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSetDifferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSetDifferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
