import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNinjasComponent } from './layout-ninjas.component';

describe('LayoutNinjasComponent', () => {
  let component: LayoutNinjasComponent;
  let fixture: ComponentFixture<LayoutNinjasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutNinjasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutNinjasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
