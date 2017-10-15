import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService, UserInfo } from '../shared/services/auth.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

import { AssetService, Asset } from '../shared/services/asset.service';

@Component({
  selector: 'app-assetdetails',
  templateUrl: './assetdetails.component.html',
  styleUrls: ['./assetdetails.component.css']
})
export class AssetdetailsComponent implements OnInit {

  readonly = true;
  asset: Asset = new Asset(null, this.auth.getCurrentUserInfo().mail, 'private', '', '', 0, 0);

  constructor(private service: AssetService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const assetId = params['id'];
      if(assetId) {
        this.service.getAsset(assetId).subscribe(
          (result) => {
            this.asset = result;
          },
          (error) => {
            this.showSnackbar('ERROR: Loading asset failed!');
            console.error('Loading asset failed');
          },
          () => {}
        );
      }
      else {
        this.readonly = false;
        this.asset = new Asset(null, this.auth.getCurrentUserInfo().mail, 'private', '', '', 0, 0);
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

  showSnackbar(message: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = <MatSnackBarVerticalPosition> 'bottom';
    config.horizontalPosition = <MatSnackBarHorizontalPosition> 'center';
    config.duration = 10000;
    this.snackBar.open(message, 'Close', config);
  }
}
