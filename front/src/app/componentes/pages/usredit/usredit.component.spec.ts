import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsreditComponent } from './usredit.component';

describe('UsreditComponent', () => {
  let component: UsreditComponent;
  let fixture: ComponentFixture<UsreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
