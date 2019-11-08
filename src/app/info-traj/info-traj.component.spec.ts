import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTrajComponent } from './info-traj.component';

describe('InfoTrajComponent', () => {
  let component: InfoTrajComponent;
  let fixture: ComponentFixture<InfoTrajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTrajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTrajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
