import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupProposalsComponent } from './startup-proposals.component';

describe('StartupProposalsComponent', () => {
  let component: StartupProposalsComponent;
  let fixture: ComponentFixture<StartupProposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartupProposalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartupProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
