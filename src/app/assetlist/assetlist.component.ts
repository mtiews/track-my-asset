import { Component, OnInit } from '@angular/core';

import { AssetService, Asset } from '../shared/services/asset.service';

@Component({
  selector: 'app-assetlist',
  templateUrl: './assetlist.component.html',
  styleUrls: ['./assetlist.component.css']
})
export class AssetlistComponent implements OnInit {

  assets: Asset[] = undefined;

  constructor(private assetService: AssetService) { }

  ngOnInit() {
    this.assetService.getAssets().subscribe(
      (next) => { this.assets = next; },
      (error) => { console.log(error); }
    )
  }

}
