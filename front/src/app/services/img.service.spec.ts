import { TestBed } from '@angular/core/testing';

import { ImgService } from './img.service';

describe('UploadImgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImgService = TestBed.get(ImgService);
    expect(service).toBeTruthy();
  });
});
