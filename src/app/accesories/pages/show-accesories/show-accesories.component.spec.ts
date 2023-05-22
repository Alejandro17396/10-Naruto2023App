import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAccesoriesComponent } from './show-accesories.component';

describe('ShowAccesoriesComponent', () => {
  let component: ShowAccesoriesComponent;
  let fixture: ComponentFixture<ShowAccesoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAccesoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAccesoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
