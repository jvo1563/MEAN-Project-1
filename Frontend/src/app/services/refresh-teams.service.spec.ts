import { TestBed } from '@angular/core/testing';

import { RefreshTeamsService } from './refresh-teams.service';

describe('RefreshTeamsService', () => {
  let service: RefreshTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
