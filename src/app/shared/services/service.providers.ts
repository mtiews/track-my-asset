import { HttpModule, Http } from '@angular/http';

import { environment } from '../../../environments/environment';

import { AssetService, AssetServiceMock } from './asset.service';
import { AuthService } from './auth.service';

export let assetServiceFactory = (http: Http, auth: AuthService) => {
    return environment.mockbackend ? new AssetServiceMock() : new AssetService(http, auth);
};
  
export let assetServiceProvider = { 
    provide: AssetService,
    useFactory: assetServiceFactory,
    deps: [Http, AuthService]
};
  