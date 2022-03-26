import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionNoticacionComponent } from './section-noticacion.component';

describe('SectionNoticacionComponent', () => {
  let component: SectionNoticacionComponent;
  let fixture: ComponentFixture<SectionNoticacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionNoticacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionNoticacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
