import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseseslistComponent } from './diseseslist.component';

describe('DiseseslistComponent', () => {
  let component: DiseseslistComponent;
  let fixture: ComponentFixture<DiseseslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseseslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseseslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
