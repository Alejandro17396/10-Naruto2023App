import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAdminAccesoriesComponent } from './layout-admin-accesories.component';

describe('LayoutAdminAccesoriesComponent', () => {
  let component: LayoutAdminAccesoriesComponent;
  let fixture: ComponentFixture<LayoutAdminAccesoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutAdminAccesoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAdminAccesoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
