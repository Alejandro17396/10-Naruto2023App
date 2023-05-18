import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnAccesoriesComponent } from './view-own-accesories.component';

describe('ViewOwnAccesoriesComponent', () => {
  let component: ViewOwnAccesoriesComponent;
  let fixture: ComponentFixture<ViewOwnAccesoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOwnAccesoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOwnAccesoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
