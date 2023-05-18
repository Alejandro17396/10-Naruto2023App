import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnSetsComponent } from './view-own-sets.component';

describe('ViewOwnSetsComponent', () => {
  let component: ViewOwnSetsComponent;
  let fixture: ComponentFixture<ViewOwnSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOwnSetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOwnSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
