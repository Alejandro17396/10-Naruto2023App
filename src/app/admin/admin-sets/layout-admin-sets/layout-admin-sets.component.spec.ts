import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAdminSetsComponent } from './layout-admin-sets.component';

describe('LayoutAdminSetsComponent', () => {
  let component: LayoutAdminSetsComponent;
  let fixture: ComponentFixture<LayoutAdminSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutAdminSetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAdminSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
