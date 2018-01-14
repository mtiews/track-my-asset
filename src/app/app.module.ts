import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { 
  MatToolbarModule, 
  MatSidenavModule, 
  MatListModule, 
  MatButtonModule, 
  MatCardModule, 
  MatSelectModule, 
  MatIconModule, 
  MatInputModule,
  MatSnackBarModule, 
  MatTabsModule,
  MatTableModule,
  MatSlideToggleModule,
  MatChipsModule
} from '@angular/material';

import { MatFormFieldModule } from '@angular/material/form-field';
import 'hammerjs';

import { AgmCoreModule } from '@agm/core';

import { environment } from '../environments/environment';

import { AuthService } from './shared/services/auth.service';

import { assetServiceProvider } from './shared/services/service.providers';

import { AppComponent } from './app.component';
import { AssetlistComponent } from './assetlist/assetlist.component';
import { GmapComponent } from './gmap/gmap.component';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { AssetdetailsComponent } from './assetdetails/assetdetails.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  }, {
    path: 'list',
    component: AssetlistComponent,
    data: { title: 'Asset List' }
  }, {
    path: 'info',
    component: InfoComponent,
    data: { title: 'Info' }
  }, {
    path: 'gmap',
    component: GmapComponent,
    data: { title: 'Map' }
  }, {
    path: 'gmap/:id',
    component: GmapComponent,
    data: { title: 'Map' }
  }, {
    path: 'details',
    component: AssetdetailsComponent,
    data: { title: 'New Asset' }
  }, {
    path: 'details/:id',
    component: AssetdetailsComponent,
    data: { title: 'Asset Details' }
  }, { 
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AssetlistComponent,
    GmapComponent,
    LoginComponent,
    InfoComponent,
    AssetdetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey
    }),
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatChipsModule,
    HttpModule
  ],
  providers: [
    assetServiceProvider,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
