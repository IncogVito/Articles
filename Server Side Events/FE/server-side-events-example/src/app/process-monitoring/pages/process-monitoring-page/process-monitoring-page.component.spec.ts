import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessMonitoringPageComponent } from './process-monitoring-page.component';

describe('ProcessMonitoringPageComponent', () => {
  let component: ProcessMonitoringPageComponent;
  let fixture: ComponentFixture<ProcessMonitoringPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessMonitoringPageComponent]
    });
    fixture = TestBed.createComponent(ProcessMonitoringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
