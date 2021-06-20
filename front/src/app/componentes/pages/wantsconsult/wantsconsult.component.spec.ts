import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WantsconsultComponent } from './wantsconsult.component';

describe('WantsconsultComponent', () => {
  let component: WantsconsultComponent;
  let fixture: ComponentFixture<WantsconsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WantsconsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WantsconsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
