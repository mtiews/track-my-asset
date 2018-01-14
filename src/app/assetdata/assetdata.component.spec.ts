import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { 
  MatCardModule,
  MatSnackBarModule,
  MatButtonModule, 
  MatTableModule,
} from '@angular/material';

import { AssetdataComponent } from './assetdata.component';
import { assetServiceProvider } from '../shared/services/service.providers';
import { AuthService } from '../shared/services/auth.service';

@Component({
  template: '<div></div>'
})
export class MockComponent {}

describe('AssetdataComponent', () => {
  let component: AssetdataComponent;
  let fixture: ComponentFixture<AssetdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetdataComponent, MockComponent ],
      imports: [
        RouterTestingModule.withRoutes([{
          path: 'list',
          component: MockComponent
        }]),
        HttpModule,
        NoopAnimationsModule,
        FormsModule,
        MatButtonModule, 
        MatCardModule,
        MatSnackBarModule,
        MatTableModule
      ],
      providers: [
        assetServiceProvider,
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', async(() => {
    expect(component).toBeTruthy();
  }));
});
