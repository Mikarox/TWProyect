import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewdiseaseComponent } from './previewdisease.component';

describe('PreviewdiseaseComponent', () => {
  let component: PreviewdiseaseComponent;
  let fixture: ComponentFixture<PreviewdiseaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewdiseaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewdiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
