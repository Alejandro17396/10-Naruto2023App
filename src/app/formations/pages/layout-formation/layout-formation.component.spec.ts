import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutFormationComponent } from './layout-formation.component';

describe('LayoutFormationComponent', () => {
  let component: LayoutFormationComponent;
  let fixture: ComponentFixture<LayoutFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
