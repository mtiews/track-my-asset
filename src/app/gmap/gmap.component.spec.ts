import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { AgmCoreModule } from '@agm/core';

import { 
  MatSnackBarModule
} from '@angular/material';

import { AuthService } from '../shared/services/auth.service';

import { GmapComponent } from './gmap.component';
import { assetServiceProvider } from '../shared/services/service.providers';

describe('GmapComponent', () => {
  let component: GmapComponent;
  let fixture: ComponentFixture<GmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapComponent ],
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        HttpModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        assetServiceProvider,
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
