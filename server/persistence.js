const loki = require("lokijs");

var persistence = {
    getAllAssets: function() {
        return db.getCollection(ASSET_COLLECTION).find({})
    },
    getAssetById: function(id) {
        return db.getCollection(ASSET_COLLECTION).findOne({'id': id});
    },
    createAsset: function(asset) {
        return db.getCollection(ASSET_COLLECTION).insert(asset)
    },
    updateAsset: function(assetDocument) {
        db.getCollection(ASSET_COLLECTION).update(assetDocument);
    }

}

const ASSET_COLLECTION = 'assets';

var db = new loki('tma.db', {
    autoload: true,
    autoloadCallback : databaseInitialize,
    autosave: true, 
    autosaveInterval: 4000
});

function databaseInitialize() {
  var assets = db.getCollection(ASSET_COLLECTION);
  if (assets === null) {
    assets = db.addCollection(ASSET_COLLECTION, { unique: ['id'], indices: ['id'] });
  }
}

module.exports = persistence;