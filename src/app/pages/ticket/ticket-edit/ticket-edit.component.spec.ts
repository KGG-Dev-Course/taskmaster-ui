import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEditComponent } from './ticket-edit.component';

describe('TicketEditComponent', () => {
  let component: TicketEditComponent;
  let fixture: ComponentFixture<TicketEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
