import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajeffecstatComponent } from './trajeffecstat.component';

describe('TrajeffecstatComponent', () => {
  let component: TrajeffecstatComponent;
  let fixture: ComponentFixture<TrajeffecstatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrajeffecstatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajeffecstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
