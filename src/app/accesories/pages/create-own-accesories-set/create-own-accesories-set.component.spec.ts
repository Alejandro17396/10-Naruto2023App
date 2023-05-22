import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOwnAccesoriesSetComponent } from './create-own-accesories-set.component';

describe('CreateOwnAccesoriesSetComponent', () => {
  let component: CreateOwnAccesoriesSetComponent;
  let fixture: ComponentFixture<CreateOwnAccesoriesSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOwnAccesoriesSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOwnAccesoriesSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
