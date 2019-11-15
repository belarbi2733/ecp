import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscrComponent } from './inscr.component';

describe('InscrComponent', () => {
  let component: InscrComponent;
  let fixture: ComponentFixture<InscrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
