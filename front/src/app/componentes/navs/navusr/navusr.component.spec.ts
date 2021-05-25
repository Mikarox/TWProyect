import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavusrComponent } from './navusr.component';

describe('NavusrComponent', () => {
  let component: NavusrComponent;
  let fixture: ComponentFixture<NavusrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavusrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavusrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
