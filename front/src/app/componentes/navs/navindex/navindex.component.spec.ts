import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavindexComponent } from './navindex.component';

describe('NavindexComponent', () => {
  let component: NavindexComponent;
  let fixture: ComponentFixture<NavindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavindexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
