import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDietComponent } from './my-diet.component';

describe('MyDietComponent', () => {
  let component: MyDietComponent;
  let fixture: ComponentFixture<MyDietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDietComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
