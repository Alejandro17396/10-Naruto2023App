import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAdminNinjasComponent } from './layout-admin-ninjas.component';

describe('LayoutAdminNinjasComponent', () => {
  let component: LayoutAdminNinjasComponent;
  let fixture: ComponentFixture<LayoutAdminNinjasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutAdminNinjasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAdminNinjasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
