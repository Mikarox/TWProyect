import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrrmComponent } from './usrrm.component';

describe('UsrrmComponent', () => {
  let component: UsrrmComponent;
  let fixture: ComponentFixture<UsrrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsrrmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
