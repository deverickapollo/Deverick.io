---
layout: post
title:  "A Cheatsheet for the Raspiblitz"
date:   2021-12-24 9:30:00 +0200
categories: ["lightning"]
tag: software
---

**I NEED LOGS!!**

**Output LND Log to Console:**
- ```sudo tail -f /mnt/hdd/lnd/logs/bitcoin/mainnet/lnd.log```
	
Output Bitcoind Logs to Console:
- **```sudo tail -f /mnt/hdd/bitcoin/debug.log```**
	
Output Raspiblitz Logs to Console:
- **```sudo tail -f /home/admin/raspiblitz.log```**


**I NEED TO KNOW THE STATUS OF MY SERVICES!!**

List user services currently running:
- **```systemctl list-dependencies multi-user.target```**
- **```systemctl list-unit-files --type=service ```**

**I NEED TO COMPACT MY CHANNEL.DB!!**
1. Check Channel Size: 
- ```sudo  du -h /mnt/hdd/lnd/data/graph/mainnet/channel.db```

2. Set the auto-compat flag by copying the below:
```
[bolt]
# Whether the databases used within lnd should automatically be compacted on
# every startup (and if the database has the configured minimum age). This is
# disabled by default because it requires additional disk space to be available
# during the compaction that is freed afterwards. In general compaction leads to
# smaller database files.
db.bolt.auto-compact=true
# How long ago the last compaction of a database file must be for it to be
# considered for auto compaction again. Can be set to 0 to compact on every
# startup. (default: 168h)
# db.bolt.auto-compact-min-age=0
```
3. Restart lnd: 
- ```systemctl restart lnd```
5. Watch logs until compacting is complete: 
- ```sudo tail -f /mnt/hdd/lnd/logs/bitcoin/mainnet/lnd.log```
7. Edit lnd.conf file by replacing 
- ```db.bolt.auto-compact=true``` with  ```#db.bolt.auto-compact=true```
