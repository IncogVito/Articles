import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProcessComponent } from './single-process.component';

describe('SingleProcessComponent', () => {
  let component: SingleProcessComponent;
  let fixture: ComponentFixture<SingleProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleProcessComponent]
    });
    fixture = TestBed.createComponent(SingleProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
