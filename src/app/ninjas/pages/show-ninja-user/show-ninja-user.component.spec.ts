import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNinjaUserComponent } from './show-ninja-user.component';

describe('ShowNinjaUserComponent', () => {
  let component: ShowNinjaUserComponent;
  let fixture: ComponentFixture<ShowNinjaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowNinjaUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowNinjaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
