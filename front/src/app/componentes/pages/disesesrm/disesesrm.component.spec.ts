import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisesesrmComponent } from './disesesrm.component';

describe('DisesesrmComponent', () => {
  let component: DisesesrmComponent;
  let fixture: ComponentFixture<DisesesrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisesesrmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisesesrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
