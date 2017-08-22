import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';

import { NavigationComponent } from './navigation/navigation.component';
import { AssetlistComponent } from './assetlist/assetlist.component';
import { GmapComponent } from './gmap/gmap.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavigationComponent,
        AssetlistComponent,
        GmapComponent
      ],
      imports: [
        RouterTestingModule,
        MaterialModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
