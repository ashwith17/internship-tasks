import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectdropdownComponent } from './selectdropdown.component';

describe('SelectdropdownComponent', () => {
  let component: SelectdropdownComponent;
  let fixture: ComponentFixture<SelectdropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectdropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
