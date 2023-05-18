import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAccesoriesComponent } from './layout-accesories.component';

describe('LayoutAccesoriesComponent', () => {
  let component: LayoutAccesoriesComponent;
  let fixture: ComponentFixture<LayoutAccesoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutAccesoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAccesoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
