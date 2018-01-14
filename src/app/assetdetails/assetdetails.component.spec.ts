import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { 
  MatCardModule,
  MatSnackBarModule,
  MatButtonModule, 
  MatSelectModule, 
  MatInputModule,
  MatTableModule,
  MatSlideToggleModule
} from '@angular/material';

import { AssetdetailsComponent } from './assetdetails.component';
import { assetServiceProvider } from '../shared/services/service.providers';
import { AuthService } from '../shared/services/auth.service';

describe('AssetdetailsComponent', () => {
  let component: AssetdetailsComponent;
  let fixture: ComponentFixture<AssetdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetdetailsComponent ],
      imports: [
        RouterTestingModule,
        HttpModule,
        NoopAnimationsModule,
        FormsModule,
        MatButtonModule, 
        MatSelectModule, 
        MatInputModule,
        MatCardModule,
        MatSnackBarModule,
        MatTableModule,
        MatSlideToggleModule
      ],
      providers: [
        assetServiceProvider,
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', async(() => {
    expect(component).toBeTruthy();
  }));
});
