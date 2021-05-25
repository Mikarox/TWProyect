import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseseseditComponent } from './disesesedit.component';

describe('DiseseseditComponent', () => {
  let component: DiseseseditComponent;
  let fixture: ComponentFixture<DiseseseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseseseditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseseseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
