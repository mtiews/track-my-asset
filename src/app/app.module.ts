import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';

import { environment } from '../environments/environment';

import { assetServiceProvider } from './shared/services/service.providers';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AssetlistComponent } from './assetlist/assetlist.component';
import { GmapComponent } from './gmap/gmap.component';

const appRoutes: Routes = [
  {
    path: 'list',
    component: AssetlistComponent,
    data: { title: 'Asset List' }
  }, {
    path: 'gmap',
    component: GmapComponent,
    data: { title: 'Map' }
  }, {
    path: 'gmap/:id',
    component: GmapComponent,
    data: { title: 'Map' }
  }, { 
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AssetlistComponent,
    GmapComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey
    }),
    HttpModule
  ],
  providers: [
    assetServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
