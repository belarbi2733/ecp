/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServerconfigService } from './serverconfig.service';

describe('Service: Serverconfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerconfigService]
    });
  });

  it('should ...', inject([ServerconfigService], (service: ServerconfigService) => {
    expect(service).toBeTruthy();
  }));
});
