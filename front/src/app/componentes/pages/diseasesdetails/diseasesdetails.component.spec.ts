import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasesdetailsComponent } from './diseasesdetails.component';

describe('DiseasesdetailsComponent', () => {
  let component: DiseasesdetailsComponent;
  let fixture: ComponentFixture<DiseasesdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseasesdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseasesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
