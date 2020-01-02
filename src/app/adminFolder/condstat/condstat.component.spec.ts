import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondstatComponent } from './condstat.component';

describe('CondstatComponent', () => {
  let component: CondstatComponent;
  let fixture: ComponentFixture<CondstatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondstatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
