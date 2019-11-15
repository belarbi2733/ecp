import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesTrajComponent } from './mes-traj.component';

describe('MesTrajComponent', () => {
  let component: MesTrajComponent;
  let fixture: ComponentFixture<MesTrajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesTrajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesTrajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
