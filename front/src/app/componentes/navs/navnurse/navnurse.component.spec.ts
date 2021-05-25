import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavnurseComponent } from './navnurse.component';

describe('NavnurseComponent', () => {
  let component: NavnurseComponent;
  let fixture: ComponentFixture<NavnurseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavnurseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavnurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
