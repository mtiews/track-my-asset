import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';

import { AuthService } from './auth.service';

@Injectable()
export class AssetService {

  baseUrl = '/api';

  constructor(private http: Http, private auth: AuthService) { }

  getAssets(): Observable<Asset[]> {
    return this.http.get(this.baseUrl + '/assets', this.getRequestOptions())
      .map((res:Response) => res.json() as Asset[])
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAsset(id: string): Observable<Asset> {
    return this.http.get(this.baseUrl + '/assets/' + id, this.getRequestOptions())
      .map((res:Response) => res.json() as Asset)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  createAsset(asset: Asset): Observable<Asset> {
    return this.http.post(this.baseUrl + '/assets', asset, this.getRequestOptions())
      .map((res:Response) => res.json() as Asset)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateAsset(asset: Asset): Observable<Asset> {
    return this.http.put(this.baseUrl + '/assets/' + asset.id, asset, this.getRequestOptions())
      .map((res:Response) => res.json() as Asset)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteAsset(id: string): Observable<Asset> {
    return this.http.delete(this.baseUrl + '/assets/' + id, this.getRequestOptions())
      .map((res:Response) => res.json() as Asset)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  private getRequestOptions() {
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.auth.getIdToken() });
    let options = new RequestOptions({ headers: headers });
    return options;
  }
}

@Injectable()
export class AssetServiceMock extends AssetService {

  constructor() { 
    super(undefined, undefined);
  }

  getAssets(): Observable<Asset[]> {
    const assets = new Array<Asset>();
    for(let i = 0; i < 100; i++) {
      assets.push(new Asset('ID_' + i, 'owner@example.com', 'Name ' + i, 'Desc' + 1, 0, 0));
    }
    return Observable.of(assets);
  }
}

export class Asset {
  constructor(public id: string, public owner: string, public name: string, public description: string, public created_ts: number, public lastsignal_ts: number) {}
}
