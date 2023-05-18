import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccesoriesComponent } from './list-accesories.component';

describe('ListAccesoriesComponent', () => {
  let component: ListAccesoriesComponent;
  let fixture: ComponentFixture<ListAccesoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAccesoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAccesoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
