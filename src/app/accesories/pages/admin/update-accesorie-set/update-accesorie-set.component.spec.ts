import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAccesorieSetComponent } from './update-accesorie-set.component';

describe('UpdateAccesorieSetComponent', () => {
  let component: UpdateAccesorieSetComponent;
  let fixture: ComponentFixture<UpdateAccesorieSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAccesorieSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAccesorieSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
