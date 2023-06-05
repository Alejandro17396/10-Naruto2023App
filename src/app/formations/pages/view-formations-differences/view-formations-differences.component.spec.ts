import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormationsDifferencesComponent } from './view-formations-differences.component';

describe('ViewFormationsDifferencesComponent', () => {
  let component: ViewFormationsDifferencesComponent;
  let fixture: ComponentFixture<ViewFormationsDifferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFormationsDifferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFormationsDifferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
