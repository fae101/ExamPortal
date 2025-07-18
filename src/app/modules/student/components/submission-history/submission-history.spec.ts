import { SubmissionHistory } from './submission-history';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('SubmissionHistory', () => {
  let component: SubmissionHistory;
  let fixture: ComponentFixture<SubmissionHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmissionHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
