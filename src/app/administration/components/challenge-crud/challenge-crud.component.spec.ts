import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeCrudComponent } from './challenge-crud.component';

describe('ChallengeCrudComponent', () => {
  let component: ChallengeCrudComponent;
  let fixture: ComponentFixture<ChallengeCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChallengeCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
