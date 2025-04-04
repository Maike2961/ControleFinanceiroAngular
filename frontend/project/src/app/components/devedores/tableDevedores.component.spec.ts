import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabalaCaloteComponent } from './tableDevedores.component';

describe('TabalaCaloteComponent', () => {
  let component: TabalaCaloteComponent;
  let fixture: ComponentFixture<TabalaCaloteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabalaCaloteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabalaCaloteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
