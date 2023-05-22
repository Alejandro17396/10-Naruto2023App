import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnNinjasComponent } from './view-own-ninjas.component';

describe('ViewOwnNinjasComponent', () => {
  let component: ViewOwnNinjasComponent;
  let fixture: ComponentFixture<ViewOwnNinjasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOwnNinjasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOwnNinjasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
