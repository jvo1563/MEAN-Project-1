import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoachFormComponent } from './edit-coach-form.component';

describe('EditCoachFormComponent', () => {
  let component: EditCoachFormComponent;
  let fixture: ComponentFixture<EditCoachFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCoachFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCoachFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
