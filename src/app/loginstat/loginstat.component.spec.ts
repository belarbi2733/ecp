import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginstatComponent } from './loginstat.component';

describe('LoginstatComponent', () => {
  let component: LoginstatComponent;
  let fixture: ComponentFixture<LoginstatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginstatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
