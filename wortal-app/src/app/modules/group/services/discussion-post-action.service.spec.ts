import { TestBed } from '@angular/core/testing';

import { DiscussionPostActionService } from './discussion-post-action.service';

describe('DiscussionPostActionService', () => {
  let service: DiscussionPostActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscussionPostActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
