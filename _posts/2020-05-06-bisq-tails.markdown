---
layout: post
title:  "Bisq - A Guide on Replacing Coinbase"
date:   2020-05-04 19:38:27 +0200
categories: Bisq
---
**General Philosophy**

1. Peer to peer services provides a level of privacy not available with services such as Coinbase and Cash App.
2. Bisq never holds your funds. Private keys remain in your possession. 
3. Trades are secured with a 2 of 2 multisig wallet and security deposits.

**Bisq on Tails**

Recently, Bisq released an update to run over torsocks. Here is a short guide to avoid some headaches.  Most of the script was borrowed from @sejktmcsdlmfhsc on [github issue #2278](https://github.com/bisq-network/bisq/issues/2278)

Follow the script below for linux. It should be rather straight forward. We are creating a directory and linking a backup file for Bisq to recognize at runtime.

Next, we will also push two firewall rules to approve Bisq.  This is required if you are using Tails OS. Yes, that means you.

Last, we will fire up our copy Bisq.  You may need to run this as a sudo user depending on your permission on the system.  

```bash
#!/bin/bash
mkdir -p /home/amnesia/.localshare/Bisq
ln -r -s /home/amnesia/Persistent/Bisq/backup /home/amnesia/.localshre/Bisq

#make authcookie readable:
sudo chmod o+r /var/run/tor/control.authcookie
#aded iptables rules to connect to nodes
sudo iptables -I OUTPUT 3 -d 127.0.0.1 -o lo -p tcp --dport 8333 --syn -m owner --uid-owner amnesia -j ACCEPT #bisq
sudo iptables -I OUTPUT 3 -d 127.0.0.1 -o lo -p tcp --dport 8000 --syn -m owner --uid-owner amnesia -j ACCEPT #bisq
#and start Bisq:
./Bisq --torControlPort 9052 --torControlCookieFile=/var/run/tor/control.authcookie --torControlUseSafeCookieAuth --seedNodes=ef5qnzx6znifo3df.onion:8000,s67qglwhkgkyvr74.onion:8000 --socks5ProxyBtcAddress=127.0.0.1:9050 --socks5ProxyHttpAddress=127.0.0.1:9050 --useLocalhostForP2P=True --useTorForBtc=True
```

**Bisq Trading**

Now lets get you trading.  It is important to remember this is a peer to peer solution for trading cryptocurrency.  What this means is your trades do not execute instantly. You will either accept an existing order or create an order for another trader to find.  

Configure your payment method in Bisq by using the Accounts Tab. I can recommend a few different accounts for US and EU traders.

1. For EU, SEPA accounts and Revolut are the #1 solution for buying and selling on the market.

2. For US, ZELLE is the #1 solution for trading but Revolut is growing and recommended. 

[Find my ref link for Revolut here.](https://revolut.com/referral/deverimeq3)

***Why do I need to deposit BTC to trade?***

Incentive to prevent either party from cheating. If you need BTC and only have XMR, XMR.to is a great option.

***Why are offers grayed out?***
1. You do not have a national account or cryptocurrency account setup for the given offer.
2. The trade offer value is larger than your current limit. Account signing will reduce these limits.  Plese read [Bisq Official Documentation](https://docs.bisq.network/payment-methods#account-signing) for further information.

**Tips**

1. Use Revolut Banking app to take advantage of the arbitrage between BTC/USD and BTC/EUR. Revolut allows up to 1000USD without fee between National currencies
2. Bisq lacks liquidity compared to most exchanges.  BTC/USD orders are often 5% - 10%.  Put your crypto to work by offering trades for . This is an easy way to generate some extra profit while providing liquiding on the market.

