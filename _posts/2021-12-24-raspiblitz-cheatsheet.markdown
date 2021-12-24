---
layout: post
title:  "A Cheatsheet for the Raspiblitz"
date:   2021-12-24 9:30:00 +0200
categories: ["lightning"]
tag: software
---

Here is a much needed cheatsheet for the raspiblitz:

**I NEED LOGS!!**

Output LND Log to Console:
**```sudo tail -f /mnt/hdd/lnd/logs/bitcoin/mainnet/lnd.log```**
	
Output Bitcoind Logs to Console:
**```sudo tail -f /mnt/hdd/bitcoin/debug.log```**
	
Output Raspiblitz Logs to Console:
**```sudo tail -f /home/admin/raspiblitz.log```**


**I NEED TO KNOW THE STATUS OF MY SERVICES!!**

List user services currently running:
**```systemctl list-dependencies multi-user.target```**
**OR**
**```systemctl list-unit-files --type=service ```**