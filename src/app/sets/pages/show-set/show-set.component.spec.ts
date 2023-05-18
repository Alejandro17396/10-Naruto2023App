import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSetComponent } from './show-set.component';

describe('ShowSetComponent', () => {
  let component: ShowSetComponent;
  let fixture: ComponentFixture<ShowSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
