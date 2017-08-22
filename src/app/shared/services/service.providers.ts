import { HttpModule, Http } from '@angular/http';

import { environment } from '../../../environments/environment';

import { AssetService, AssetServiceMock } from './asset.service';


export let assetServiceFactory = (http: Http) => {
    return environment.mockbackend ? new AssetServiceMock() : new AssetService(http);
};
  
export let assetServiceProvider = { 
    provide: AssetService,
    useFactory: assetServiceFactory,
    deps: [Http]
};
  