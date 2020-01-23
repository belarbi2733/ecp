import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourneffecstatComponent } from './tourneffecstat.component';

describe('TourneffecstatComponent', () => {
  let component: TourneffecstatComponent;
  let fixture: ComponentFixture<TourneffecstatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourneffecstatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourneffecstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
