import { TestBed } from '@angular/core/testing';

import { ProcessMonitoringService } from './process-monitoring.service';

describe('ProcessMonitoringService', () => {
  let service: ProcessMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
