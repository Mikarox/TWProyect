import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsraddComponent } from './usradd.component';

describe('UsraddComponent', () => {
  let component: UsraddComponent;
  let fixture: ComponentFixture<UsraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsraddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
