import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNinjaUserFormationPanelComponent } from './show-ninja-user-formation-panel.component';

describe('ShowNinjaUserFormationPanelComponent', () => {
  let component: ShowNinjaUserFormationPanelComponent;
  let fixture: ComponentFixture<ShowNinjaUserFormationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowNinjaUserFormationPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowNinjaUserFormationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
