import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNinjaDifferencesComponent } from './view-ninja-differences.component';

describe('ViewNinjaDifferencesComponent', () => {
  let component: ViewNinjaDifferencesComponent;
  let fixture: ComponentFixture<ViewNinjaDifferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNinjaDifferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNinjaDifferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
