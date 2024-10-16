import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCoachFormComponent } from './new-coach-form.component';

describe('NewCoachFormComponent', () => {
  let component: NewCoachFormComponent;
  let fixture: ComponentFixture<NewCoachFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCoachFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCoachFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
