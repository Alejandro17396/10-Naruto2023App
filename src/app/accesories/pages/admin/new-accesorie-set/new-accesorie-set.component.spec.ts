import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccesorieSetComponent } from './new-accesorie-set.component';

describe('NewAccesorieSetComponent', () => {
  let component: NewAccesorieSetComponent;
  let fixture: ComponentFixture<NewAccesorieSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAccesorieSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAccesorieSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
