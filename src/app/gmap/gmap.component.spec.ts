import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AgmCoreModule } from '@agm/core';

import { GmapComponent } from './gmap.component';

describe('GmapComponent', () => {
  let component: GmapComponent;
  let fixture: ComponentFixture<GmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapComponent ],
      imports: [
        RouterTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
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
