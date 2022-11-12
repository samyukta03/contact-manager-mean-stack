import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinnavbarComponent } from './linnavbar.component';

describe('LinnavbarComponent', () => {
  let component: LinnavbarComponent;
  let fixture: ComponentFixture<LinnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinnavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
