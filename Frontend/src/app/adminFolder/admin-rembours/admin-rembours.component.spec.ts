import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRemboursComponent } from './admin-rembours.component';

describe('AdminRemboursComponent', () => {
  let component: AdminRemboursComponent;
  let fixture: ComponentFixture<AdminRemboursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRemboursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRemboursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
