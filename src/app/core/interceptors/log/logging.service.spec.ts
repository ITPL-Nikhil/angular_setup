import { TestBed } from '@angular/core/testing';

import { LoggingInterceptor } from './logging.interceptor';

describe('AuthService', () => {
  let service: LoggingInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
