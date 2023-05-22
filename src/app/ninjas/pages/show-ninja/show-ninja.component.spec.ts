import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNinjaComponent } from './show-ninja.component';

describe('ShowNinjaComponent', () => {
  let component: ShowNinjaComponent;
  let fixture: ComponentFixture<ShowNinjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowNinjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowNinjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
