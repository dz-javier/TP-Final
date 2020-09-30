import { TestBed } from '@angular/core/testing';

import { DomoticAppService } from './domotic-app.service';

describe('DomoticAppService', () => {
  let service: DomoticAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomoticAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
