import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamDetailsComponent } from './stream-details.component';

describe('StreamDetailsComponent', () => {
  let component: StreamDetailsComponent;
  let fixture: ComponentFixture<StreamDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
