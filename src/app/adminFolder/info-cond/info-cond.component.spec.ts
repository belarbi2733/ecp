import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCondComponent } from './info-cond.component';

describe('InfoCondComponent', () => {
  let component: InfoCondComponent;
  let fixture: ComponentFixture<InfoCondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
