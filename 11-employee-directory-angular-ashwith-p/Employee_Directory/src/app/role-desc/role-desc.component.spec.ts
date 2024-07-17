import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDescComponent } from './role-desc.component';

describe('RoleDescComponent', () => {
  let component: RoleDescComponent;
  let fixture: ComponentFixture<RoleDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleDescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
