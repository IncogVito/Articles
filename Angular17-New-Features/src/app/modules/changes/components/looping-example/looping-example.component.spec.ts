import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopingExampleComponent } from './looping-example.component';

describe('LoopingExampleComponent', () => {
  let component: LoopingExampleComponent;
  let fixture: ComponentFixture<LoopingExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoopingExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoopingExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
