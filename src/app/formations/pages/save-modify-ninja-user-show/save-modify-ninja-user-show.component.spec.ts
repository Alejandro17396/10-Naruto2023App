import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveModifyNinjaUserShowComponent } from './save-modify-ninja-user-show.component';

describe('SaveModifyNinjaUserShowComponent', () => {
  let component: SaveModifyNinjaUserShowComponent;
  let fixture: ComponentFixture<SaveModifyNinjaUserShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveModifyNinjaUserShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveModifyNinjaUserShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
