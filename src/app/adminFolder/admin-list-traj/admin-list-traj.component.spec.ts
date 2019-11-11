import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListTrajComponent } from './admin-list-traj.component';

describe('AdminListTrajComponent', () => {
  let component: AdminListTrajComponent;
  let fixture: ComponentFixture<AdminListTrajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListTrajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListTrajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
