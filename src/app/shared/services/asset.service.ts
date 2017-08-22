import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';

@Injectable()
export class AssetService {

  baseUrl = '/api/';

  constructor(private http: Http) { }

  getAssets(): Observable<Asset[]> {
    return this.http.get(this.baseUrl + '/assets')
      .map((res:Response) => res.json() as Asset[])
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}

@Injectable()
export class AssetServiceMock extends AssetService {

  constructor() { 
    super(undefined);
  }

  getAssets(): Observable<Asset[]> {
    const assets = new Array<Asset>();
    for(let i = 0; i < 100; i++) {
      assets.push(new Asset('ID_' + i, 'Name ' + i, 51.0, 11.0));
    }
    return Observable.of(assets);
  }
}

export class Asset {
  constructor(private id: string, private name: string, private latitude: number, private longitude: number) {}
}
