import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisesesaddComponent } from './disesesadd.component';

describe('DisesesaddComponent', () => {
  let component: DisesesaddComponent;
  let fixture: ComponentFixture<DisesesaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisesesaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisesesaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
