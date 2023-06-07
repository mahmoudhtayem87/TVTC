import { TestBed } from '@angular/core/testing';

import { ChartBoardMembersService } from './chart-board-members.service';

describe('ChartBoardMembersService', () => {
  let service: ChartBoardMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartBoardMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
