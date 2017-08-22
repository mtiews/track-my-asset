import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { AssetService } from './asset.service';

describe('AssetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule],
      providers: [AssetService]
    });
  });

  it('should be created', inject([AssetService], (service: AssetService) => {
    expect(service).toBeTruthy();
  }));
});
