import { TestBed } from '@angular/core/testing';

import { ChartFacilityServicesService } from './chart-facility-services.service';

describe('ChartFacilityServicesService', () => {
  let service: ChartFacilityServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartFacilityServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
