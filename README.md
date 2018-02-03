Hush Explorer - 1.6.1
================

An open source block explorer for Hush written in node.js based on [Iquidus Explorer - 1.6.1](https://github.com/iquidus/explorer)

### See it in action
*  [Hush explorer](https://explorer2.myhush.info)
*  [Hush explorer](https://explorer2.myhush.online)
*  [Hush explorer](http://188.165.212.101:3003/)
*  [Tush explorer](https://testnet2.myhush.info)
*  [Tush explorer](https://testnet2.myhush.online)
*  [Tush explorer](http://188.165.212.101:3004/)

*note: If you would like your instance mentioned here contact me*

### Requires

*  node.js >= 0.10.28
*  mongodb 2.6.x
*  hushd

### Create database

Enter MongoDB cli:

    $ mongo

Create databse:

    > use explorerdb

* livenet HUSH: Create user with read/write access:

        db.createUser( { user: "hush", pwd: "3xp!0reR", roles: [ "readWrite" ] } )

* testnet TUSH: Create user with read/write access:

        db.createUser( { user: "tush", pwd: "3xp!0reR", roles: [ "readWrite" ] } )


### Get the source

    git clone https://github.com/TheTrunk/explorer-hush

### Install node modules

    cd explorer-hush && npm install --production

### Configure

* livenet HUSH 
 
        cp ./settings.json.template ./settings.json
 
* testnet TUSH 

        cp ./tushsettings.json.template ./settings.json

*Make required changes in settings.json e.g. your rpc username/password*

### Start Explorer

    npm start

*note: mongod must be running to start the explorer-hush*

The explorer defaults to cluster mode, forking an instance of its process to each cpu core. This results in increased performance and stability. Load balancing gets automatically taken care of and any instances that for some reason die, will be restarted automatically. For testing/development (or if you just wish to) a single instance can be launched with

    node --stack-size=10000 bin/instance

To stop the cluster you can use

    npm stop

### Syncing databases with the blockchain

sync.js (located in scripts/) is used for updating the local databases. This script must be called from the explorers root directory.

    Usage: node scripts/sync.js [database] [mode]

    database: (required)
    index [mode] Main index: coin info/stats, transactions & addresses
    market       Market data: summaries, orderbooks, trade history & chartdata

    mode: (required for index database only)
    update       Updates index from last sync to current block
    check        checks index for (and adds) any missing transactions/addresses
    reindex      Clears index then resyncs from genesis to current block

    notes:
    * 'current block' is the latest created block when script is executed.
    * The market database only supports (& defaults to) reindex mode.
    * If check mode finds missing data(ignoring new data since last sync),
      index_timeout in settings.json is set too low.


*It is recommended to have this script launched via a cronjob at 1+ min intervals.*

**crontab**

*Example crontab; update index every minute and market data every 2 minutes*

    */1 * * * * cd /path/to/explorer-hush && node scripts/sync.js index update > /dev/null 2>&1
    */2 * * * * cd /path/to/explorer-hush && node scripts/sync.js market > /dev/null 2>&1
    */5 * * * * cd /path/to/explorer-hush && node scripts/peers.js > /dev/null 2>&1

### Wallet

The HUSH/TUSH wallet must be running with at least the following flags

    -daemon -txindex 

* livenet HUSH
   
        ./hushd -txindex

* testnet TUSH

        ./hushd -testnet -txindex

### Donate

    HUSH: t1TSDB3nmS1JFDDJkyddumfTw9HwvMVeHnL

### Known Issues

**script is already running.**

If you receive this message when launching the sync script either a) a sync is currently in progress, or b) a previous sync was killed before it completed. If you are certian a sync is not in progress remove the index.pid from the tmp folder in the explorer root directory.

    rm tmp/index.pid

**exceeding stack size**

    RangeError: Maximum call stack size exceeded

Nodes default stack size may be too small to index addresses with many tx's. If you experience the above error while running sync.js the stack size needs to be increased.

To determine the default setting run

    node --v8-options | grep -B0 -A1 stack_size

To run sync.js with a larger stack size launch with

    node --stack-size=[SIZE] scripts/sync.js index update

Where [SIZE] is an integer higher than the default.

*note: SIZE will depend on which blockchain you are using, you may need to play around a bit to find an optimal setting*

### License

Copyright (c) 2015, Iquidus Technology  
Copyright (c) 2015, Luke Williams   
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of Iquidus Technology nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
