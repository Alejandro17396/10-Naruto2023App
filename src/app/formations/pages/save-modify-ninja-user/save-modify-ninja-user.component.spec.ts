import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveModifyNinjaUserComponent } from './save-modify-ninja-user.component';

describe('SaveModifyNinjaUserComponent', () => {
  let component: SaveModifyNinjaUserComponent;
  let fixture: ComponentFixture<SaveModifyNinjaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveModifyNinjaUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveModifyNinjaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
