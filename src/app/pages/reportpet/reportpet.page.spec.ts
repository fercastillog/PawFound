import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportpetPage } from './reportpet.page';

describe('ReportpetPage', () => {
  let component: ReportpetPage;
  let fixture: ComponentFixture<ReportpetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportpetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
