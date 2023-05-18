import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOwnAccesoriesComponent } from './create-own-accesories.component';

describe('CreateOwnAccesoriesComponent', () => {
  let component: CreateOwnAccesoriesComponent;
  let fixture: ComponentFixture<CreateOwnAccesoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOwnAccesoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOwnAccesoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
