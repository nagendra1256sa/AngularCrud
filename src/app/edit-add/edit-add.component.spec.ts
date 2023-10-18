import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddComponent } from './edit-add.component';

describe('EditAddComponent', () => {
  let component: EditAddComponent;
  let fixture: ComponentFixture<EditAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAddComponent]
    });
    fixture = TestBed.createComponent(EditAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
