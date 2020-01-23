import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColislivrstatComponent } from './colislivrstat.component';

describe('ColislivrstatComponent', () => {
  let component: ColislivrstatComponent;
  let fixture: ComponentFixture<ColislivrstatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColislivrstatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColislivrstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
