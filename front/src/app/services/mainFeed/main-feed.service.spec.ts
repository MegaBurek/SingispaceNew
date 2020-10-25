import { TestBed } from '@angular/core/testing';

import { MainFeedService } from './main-feed.service';

describe('MainFeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainFeedService = TestBed.get(MainFeedService);
    expect(service).toBeTruthy();
  });
});
