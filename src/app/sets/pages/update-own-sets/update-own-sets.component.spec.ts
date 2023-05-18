import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOwnSetsComponent } from './update-own-sets.component';

describe('UpdateOwnSetsComponent', () => {
  let component: UpdateOwnSetsComponent;
  let fixture: ComponentFixture<UpdateOwnSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOwnSetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOwnSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
