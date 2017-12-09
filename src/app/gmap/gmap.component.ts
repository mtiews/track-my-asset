import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

import { AssetService, Asset } from '../shared/services/asset.service';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {

  title: string = 'Asset Position';
  lat: number = 0.0;
  lng: number = 0.0;
  zoom: number = 15;

  constructor(private service: AssetService, public snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const assetId = params['id'];
      if(assetId) {
        this.service.getAsset(assetId).subscribe(
          (result) => {
            this.title = result.name;
            this.lat = 0.0;
            this.lng = 0.0;
            if(result.datapoints) {
              result.datapoints.forEach(v => {
                if('gps_lat' === v.id) {
                  this.lat = Number(v.value);
                } else if('gps_lon' === v.id) {
                  this.lng = Number(v.value);
                }
              });
            }
          },
          (error) => {
            this.showSnackbar('ERROR: Loading asset failed!');
            console.error('Loading asset failed');
          },
          () => {}
        );
      }
    });
  }

  showSnackbar(message: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = <MatSnackBarVerticalPosition> 'bottom';
    config.horizontalPosition = <MatSnackBarHorizontalPosition> 'center';
    config.duration = 10000;
    this.snackBar.open(message, 'Close', config);
  }
}
