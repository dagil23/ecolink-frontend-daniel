import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionCrudComponent } from './mission-crud.component';

describe('MissionCrudComponent', () => {
  let component: MissionCrudComponent;
  let fixture: ComponentFixture<MissionCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MissionCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
