import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesTournComponent } from './mes-tourn.component';

describe('MesTournComponent', () => {
  let component: MesTournComponent;
  let fixture: ComponentFixture<MesTournComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesTournComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesTournComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
