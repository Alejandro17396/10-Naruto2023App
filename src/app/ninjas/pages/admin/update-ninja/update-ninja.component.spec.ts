import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNinjaComponent } from './update-ninja.component';

describe('UpdateNinjaComponent', () => {
  let component: UpdateNinjaComponent;
  let fixture: ComponentFixture<UpdateNinjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNinjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateNinjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
