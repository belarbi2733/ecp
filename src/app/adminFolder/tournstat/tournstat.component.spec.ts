import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournstatComponent } from './tournstat.component';

describe('TournstatComponent', () => {
  let component: TournstatComponent;
  let fixture: ComponentFixture<TournstatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournstatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
