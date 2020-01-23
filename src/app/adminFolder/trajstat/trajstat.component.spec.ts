import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajstatComponent } from './trajstat.component';

describe('TrajstatComponent', () => {
  let component: TrajstatComponent;
  let fixture: ComponentFixture<TrajstatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrajstatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
