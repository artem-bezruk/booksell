import { TestBed, inject } from '@angular/core/testing';
import { AwsProductAdvertApiService } from './aws-product-advert-api.service';
describe('AwsProductAdvertApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwsProductAdvertApiService]
    });
  });
  it('should be created', inject([AwsProductAdvertApiService], (service: AwsProductAdvertApiService) => {
    expect(service).toBeTruthy();
  }));
});
