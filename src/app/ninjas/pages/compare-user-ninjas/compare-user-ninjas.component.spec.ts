import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareUserNinjasComponent } from './compare-user-ninjas.component';

describe('CompareUserNinjasComponent', () => {
  let component: CompareUserNinjasComponent;
  let fixture: ComponentFixture<CompareUserNinjasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareUserNinjasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareUserNinjasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
