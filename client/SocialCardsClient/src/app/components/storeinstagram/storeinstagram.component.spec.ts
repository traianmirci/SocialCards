import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreinstagramComponent } from './storeinstagram.component';

describe('StoreinstagramComponent', () => {
  let component: StoreinstagramComponent;
  let fixture: ComponentFixture<StoreinstagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreinstagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreinstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
