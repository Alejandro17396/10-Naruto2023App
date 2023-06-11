import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNinjaUserDifferencesComponent } from './view-ninja-user-differences.component';

describe('ViewNinjaUserDifferencesComponent', () => {
  let component: ViewNinjaUserDifferencesComponent;
  let fixture: ComponentFixture<ViewNinjaUserDifferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNinjaUserDifferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNinjaUserDifferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
