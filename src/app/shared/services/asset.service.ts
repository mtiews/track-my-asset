import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';

import { AuthService } from './auth.service';

@Injectable()
export class AssetService {

  baseUrl = './api';

  constructor(private http: Http, private auth: AuthService) { }

  getAssets(): Observable<Asset[]> {
    return this.http.get(this.baseUrl + '/assets', this.getRequestOptions())
      .map((res:Response) => res.json() as Asset[])
      .catch((error:any) => this.handleError(error));
  }

  getPublicAssets(): Observable<Asset[]> {
    return this.http.get(this.baseUrl + '/publicassets', this.getRequestOptions())
      .map((res:Response) => res.json() as Asset[])
      .catch((error:any) => this.handleError(error));
  }

  getAsset(id: string): Observable<Asset> {
    return this.http.get(this.baseUrl + '/assets/' + id, this.getRequestOptions())
      .map((res:Response) => res.json() as Asset)
      .catch((error:any) => this.handleError(error));
  }

  createAsset(asset: Asset): Observable<Asset> {
    return this.http.post(this.baseUrl + '/assets', asset, this.getRequestOptions())
      .map((res:Response) => res.json() as Asset)
      .catch((error:any) => this.handleError(error));
  }

  updateAsset(asset: Asset): Observable<Asset> {
    return this.http.put(this.baseUrl + '/assets/' + asset.id, asset, this.getRequestOptions())
      .map((res:Response) => res.json() as Asset)
      .catch((error:any) => this.handleError(error));
  }

  deleteAsset(id: string): Observable<Asset> {
    return this.http.delete(this.baseUrl + '/assets/' + id, this.getRequestOptions())
      .map((res:Response) => res.json() as Asset)
      .catch((error:any) => this.handleError(error));
  }

  private getRequestOptions() {
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.auth.getIdToken() });
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  private handleError(error) {
    // console.log(JSON.stringify(error));
    if(error.status === 401) {
      this.auth.logout();
    }
    return Observable.throw('Server error: ' + error.status + ' ' + error.statusText);
  }
}

@Injectable()
export class AssetServiceMock extends AssetService {

  private assets: Map<String, Asset> = new Map();
  constructor() { 
    super(undefined, undefined);
  }

  getAssets(): Observable<Asset[]> {
    return Observable.of(Array.from(this.assets.values()));
  }

  getPublicAssets(): Observable<Asset[]> {
    const assetlist = new Array<Asset>();
    this.assets.forEach(a => {
      if(a.visibility === 'public') {
        assetlist.push(a);
      };
    });
    return Observable.of(assetlist);
  }

  getAsset(id: string): Observable<Asset> {
    return Observable.of(this.assets.get(id));
  }

  createAsset(asset: Asset): Observable<Asset> {
    asset.id = (new Date()).getTime().toString();
    this.assets.set(asset.id, asset);
    return Observable.of(asset);
  }

  updateAsset(asset: Asset): Observable<Asset> {
    this.assets.set(asset.id, asset);
    return Observable.of(asset);
  }

  deleteAsset(id: string): Observable<Asset> {
    const asset = this.assets.get(id);
    this.assets.delete(id);
    return Observable.of(asset);
  }
}

export class Asset {
  constructor(public id: string, public owner: string, public visibility: AssetVisibility, public name: string, public description: string, public created_ts: number, public lastsignal_ts: number) {}
}

export declare type AssetVisibility = 'private' | 'public';
