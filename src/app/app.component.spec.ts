import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';

import { AuthService } from './shared/services/auth.service';

import { AssetlistComponent } from './assetlist/assetlist.component';
import { GmapComponent } from './gmap/gmap.component';
import { LoginComponent } from './login/login.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AssetlistComponent,
        GmapComponent,
        LoginComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([ 
        {
          path: 'login',
          component: LoginComponent
        }
        ])
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [ 
        AuthService 
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
