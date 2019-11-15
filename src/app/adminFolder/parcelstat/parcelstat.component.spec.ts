import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelstatComponent } from './parcelstat.component';

describe('ParcelstatComponent', () => {
  let component: ParcelstatComponent;
  let fixture: ComponentFixture<ParcelstatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParcelstatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
