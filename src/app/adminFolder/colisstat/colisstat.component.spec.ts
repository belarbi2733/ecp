import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColisstatComponent } from './colisstat.component';

describe('ColisstatComponent', () => {
  let component: ColisstatComponent;
  let fixture: ComponentFixture<ColisstatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColisstatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColisstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
