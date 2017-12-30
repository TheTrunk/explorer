/**
* The Settings Module reads the settings out of settings.json and provides
* this information to the other modules
*/

var fs = require("fs");
var jsonminify = require("jsonminify");


//The app title, visible e.g. in the browser window
exports.title = "blockchain";

//The url it will be accessed from
exports.address = "explorer.myhush.info";

// logo
exports.logo = "/images/logo.png";


//The app favicon fully specified url, visible e.g. in the browser window
exports.favicon = "favicon.ico";

//Theme
exports.theme = "Cyborg";

//The Port ep-lite should listen to
exports.port = process.env.PORT || 3001;


//coin symbol, visible e.g. MAX, LTC, HVC
exports.symbol = "HUSH";


//coin name, visible e.g. in the browser window
exports.coin = "Hush";


//This setting is passed to MongoDB to set up the database
exports.dbsettings = {
  "user": "hush",
  "password": "3xp!0reR",
  "database": "blockchaindb",
  "address" : "localhost",
  "port" : 27017
};


//This setting is passed to the wallet
exports.wallet = { "host" : "127.0.0.1",
  "port" : 8822,
  "user" : "rpcuser",
  "pass" : "axy52rpop2o"
};


//Locale file
exports.locale = "locale/en.json",


//Menu items to display
exports.display = {
  "api": true,
  "market": true,
  "twitter": true,
  "facebook": false,
  "googleplus": false,
  "search": true,
  "richlist": true,
  "movement": true,
  "network": true,
  "github": true,
  "discord": true,
  "website": true
};


//API view
exports.api = {
  "blockindex": 70000,
  "blockhash": "000000ddd2b65cf956e414d7574d27608f609c63d112cc5abc299a97ca9f12be",
  "txhash": "281f33fc526eb059c3c99e472c649fd6fcffe2bf47ba67ecd184061351edfea2",
  "address": "t1UahJwU2ewQew9AvwYy2Qp1heKXJDcTkeZ",
};

// markets
exports.markets = {
  "coin": "HUSH",
  "exchange": "BTC",
  "enabled": ['cryptopia'],
  "default": "cryptopia"
};

// richlist/top100 settings
exports.richlist = {
  "distribution": true,
  "received": true,
  "balance": true
};

exports.movement = {
  "min_amount": 100,
  "low_flag": 1000,
  "high_flag": 10000
},

//index
exports.index = {
  "show_hashrate": false,
  "difficulty": "POW",
  "last_txs": 100
};

// twitter
exports.twitter = "MyHushTeam";
exports.facebook = "";
exports.googleplus = "";
exports.website = "";
exports.github = "MyHush";
exports.discord = "hush";

exports.confirmations = 6;

//timeouts
exports.update_timeout = 125;
exports.check_timeout = 250;


//genesis
exports.genesis_tx = "830539f9ec196f36a2759638b674a51b668eba7bbf6af10c56fed4af666be177";
exports.genesis_block = "0003a67bc26fe564b75daf11186d360652eb435a35ba3d9d3e7e5d5f8e62dc17";

exports.heavy = false;
exports.txcount = 100;
exports.show_sent_received = true;
exports.supply = "COINBASE";
exports.nethash = "getnetworkhashps";
exports.nethash_units = "K";

exports.labels = {};

exports.reloadSettings = function reloadSettings() {
  // Discover where the settings file lives
  var settingsFilename = "settings.json";
  settingsFilename = "./" + settingsFilename;

  var settingsStr;
  try{
    //read the settings sync
    settingsStr = fs.readFileSync(settingsFilename).toString();
  } catch(e){
    console.warn('No settings file found. Continuing using defaults!');
  }

  // try to parse the settings
  var settings;
  try {
    if(settingsStr) {
      settingsStr = jsonminify(settingsStr).replace(",]","]").replace(",}","}");
      settings = JSON.parse(settingsStr);
    }
  }catch(e){
    console.error('There was an error processing your settings.json file: '+e.message);
    process.exit(1);
  }

  //loop trough the settings
  for(var i in settings)
  {
    //test if the setting start with a low character
    if(i.charAt(0).search("[a-z]") !== 0)
    {
      console.warn("Settings should start with a low character: '" + i + "'");
    }

    //we know this setting, so we overwrite it
    if(exports[i] !== undefined)
    {
      exports[i] = settings[i];
    }
    //this setting is unkown, output a warning and throw it away
    else
    {
      console.warn("Unknown Setting: '" + i + "'. This setting doesn't exist or it was removed");
    }
  }

};

// initially load settings
exports.reloadSettings();
