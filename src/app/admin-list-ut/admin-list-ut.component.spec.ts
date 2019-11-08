import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListUtComponent } from './admin-list-ut.component';

describe('AdminListUtComponent', () => {
  let component: AdminListUtComponent;
  let fixture: ComponentFixture<AdminListUtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListUtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListUtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
