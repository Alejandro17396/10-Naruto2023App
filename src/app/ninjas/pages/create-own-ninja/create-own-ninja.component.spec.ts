import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOwnNinjaComponent } from './create-own-ninja.component';

describe('CreateOwnNinjaComponent', () => {
  let component: CreateOwnNinjaComponent;
  let fixture: ComponentFixture<CreateOwnNinjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOwnNinjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOwnNinjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
