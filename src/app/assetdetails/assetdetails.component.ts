import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import { AuthService, UserInfo } from '../shared/services/auth.service';
import { 
  MatSnackBar, 
  MatSnackBarConfig, 
  MatSnackBarHorizontalPosition, 
  MatSnackBarVerticalPosition 
} from '@angular/material';

import { AssetService, Asset, Datapoint } from '../shared/services/asset.service';

@Component({
  selector: 'app-assetdetails',
  templateUrl: './assetdetails.component.html',
  styleUrls: ['./assetdetails.component.css']
})
export class AssetdetailsComponent implements OnInit {

  readonly = true;
  isOwner = false;
  asset: Asset = null;
  userInfo: UserInfo = null;
  isNewAsset: boolean = false;

  private _datapointsSource = new BehaviorSubject<Datapoint[]>([]);
  datapointsDataSource: DatapointsDataSource | null;
  dplistDisplayedColumns = ['id', 'value', 'timestamp'];

  constructor(private service: AssetService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.datapointsDataSource = new DatapointsDataSource(this._datapointsSource);
    this.resetForm();
    
    this.auth.userInfo$.subscribe((userInfo) => {
      this.userInfo = userInfo;
      if(this.isNewAsset || this.asset && this.userInfo && this.asset.owner === this.userInfo.mail) {
        this.isOwner = true;
      } else {
        this.isOwner = false;
      }
    });

    this.route.params.subscribe((params) => {
      this.resetForm();

      const assetId = params['id'];
      if(assetId) {
        this.service.getAsset(assetId).subscribe(
          (result) => {
            if(result) {
              this.asset = result;
              this.readonly = true;
              if(this.asset && this.userInfo && this.asset.owner === this.userInfo.mail) {
                this.isOwner = true;
              } else {
                this.isOwner = false;
              }
              this._datapointsSource.next(this.asset.datapoints);
            } else {
              setTimeout(() =>
                this.showSnackbar('ERROR: Asset not found!'),
                1000);
            }
          },
          (error) => {
            this.showSnackbar('ERROR: Loading asset failed!');
            console.error('Loading asset failed');
          },
          () => {}
        );
      } else {
        this.isNewAsset = true;
      }
    });
  }

  saveAssetClicked() {
    if(this.asset.id) {
      this.service.updateAsset(this.asset).subscribe(
        (result) => {
          this.showSnackbar('Asset updated!');
          this.asset = result;
        },
        (error) => {
          this.showSnackbar('ERROR: Updating asset failed!');
          console.error('Updating asset failed');
        },
        () => { /* finished */ }
      );
    }
    else {
      this.service.createAsset(this.asset).subscribe(
        (result) => {
          this.showSnackbar('Asset created!');
          this.asset = result;
          this.router.navigate(['/details', this.asset.id]);
        },
        (error) => {
          this.showSnackbar('ERROR: Creating asset failed!');
          console.error('Creating asset failed');
        },
        () => { /* finished */ }
      );
    }
  }

  deleteAssetClicked() {
    this.service.deleteAsset(this.asset.id).subscribe(
      (result) => {
        this.showSnackbar('Asset deleted!');
        this.router.navigate(['list']);
      },
      (error) => {
        this.showSnackbar('ERROR: Deleting asset failed!');
        console.error('Deleting asset failed');
      },
      () => { /* finished */ }
    );
  }

  editAssetClicked() {
    this.readonly = false;
  }

  resetForm() {
    this.readonly = false;
    this.isOwner = true;
    this.asset = new Asset(null, null, 'private', '', '', 0, 0);
    this._datapointsSource.next([]);
  }

  showSnackbar(message: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = <MatSnackBarVerticalPosition> 'bottom';
    config.horizontalPosition = <MatSnackBarHorizontalPosition> 'center';
    config.duration = 10000;
    this.snackBar.open(message, 'Close', config);
  }
}

export class DatapointsDataSource extends DataSource<Datapoint> {
  public isEmpty = true;

  constructor(private _datapointsSource: BehaviorSubject<Datapoint[]>) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Datapoint[]> {
      return this._datapointsSource.do(data => this.isEmpty = (!data || data.length === 0));
  }

  disconnect() {}
}
