import { TestBed } from '@angular/core/testing';

import { OrgEntityServiceService } from './org-entity-service.service';

describe('OrgEntityServiceService', () => {
  let service: OrgEntityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgEntityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
