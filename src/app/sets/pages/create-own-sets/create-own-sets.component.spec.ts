import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOwnSetsComponent } from './create-own-sets.component';

describe('CreateOwnSetsComponent', () => {
  let component: CreateOwnSetsComponent;
  let fixture: ComponentFixture<CreateOwnSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOwnSetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOwnSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
