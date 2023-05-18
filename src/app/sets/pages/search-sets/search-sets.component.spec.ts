import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSetsComponent } from './search-sets.component';

describe('SearchSetsComponent', () => {
  let component: SearchSetsComponent;
  let fixture: ComponentFixture<SearchSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
