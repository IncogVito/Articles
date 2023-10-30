import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfElseExampleComponent } from './if-else-example.component';

describe('IfElseExampleComponent', () => {
  let component: IfElseExampleComponent;
  let fixture: ComponentFixture<IfElseExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IfElseExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IfElseExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
