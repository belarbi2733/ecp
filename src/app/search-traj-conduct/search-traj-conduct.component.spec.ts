import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrajConductComponent } from './search-traj-conduct.component';

describe('SearchTrajConductComponent', () => {
  let component: SearchTrajConductComponent;
  let fixture: ComponentFixture<SearchTrajConductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTrajConductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTrajConductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
