import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LienInscrComponent } from './lien-inscr.component';

describe('LienInscrComponent', () => {
  let component: LienInscrComponent;
  let fixture: ComponentFixture<LienInscrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LienInscrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LienInscrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
