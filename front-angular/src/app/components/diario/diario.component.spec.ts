import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioComponent } from './diario.component';

describe('DiarioComponent', () => {
  let component: DiarioComponent;
  let fixture: ComponentFixture<DiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiarioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
