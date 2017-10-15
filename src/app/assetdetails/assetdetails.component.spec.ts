import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetdetailsComponent } from './assetdetails.component';

describe('AssetdetailsComponent', () => {
  let component: AssetdetailsComponent;
  let fixture: ComponentFixture<AssetdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
