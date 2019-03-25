import { TestBed } from '@angular/core/testing';

import { WebStatsService } from './web-stats.service';

describe('WebStatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebStatsService = TestBed.get(WebStatsService);
    expect(service).toBeTruthy();
  });
});
