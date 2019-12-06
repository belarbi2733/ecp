import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpayComponent } from './adminpay.component';

describe('AdminpayComponent', () => {
  let component: AdminpayComponent;
  let fixture: ComponentFixture<AdminpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
