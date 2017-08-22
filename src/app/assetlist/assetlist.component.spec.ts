import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '@angular/material';

import { assetServiceProvider } from '../shared/services/service.providers';
import { AssetlistComponent } from './assetlist.component';

describe('AssetlistComponent', () => {
  let component: AssetlistComponent;
  let fixture: ComponentFixture<AssetlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetlistComponent ],
      imports: [ 
        MaterialModule,
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        assetServiceProvider
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
