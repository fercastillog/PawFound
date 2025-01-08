import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PawFoundPage } from './paw-found.page';

describe('PawFoundPage', () => {
  let component: PawFoundPage;
  let fixture: ComponentFixture<PawFoundPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PawFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
