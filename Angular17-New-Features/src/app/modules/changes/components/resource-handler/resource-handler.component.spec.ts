import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceHandlerComponent } from './resource-handler.component';

describe('ResourceHandlerComponent', () => {
  let component: ResourceHandlerComponent;
  let fixture: ComponentFixture<ResourceHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceHandlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
