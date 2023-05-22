import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinjaListComponent } from './ninja-list.component';

describe('NinjaListComponent', () => {
  let component: NinjaListComponent;
  let fixture: ComponentFixture<NinjaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinjaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinjaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
