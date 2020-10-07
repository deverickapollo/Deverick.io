---
layout: post
title:  "Bisq - A Guide on Replacing Coinbase"
date:   2020-07-16 13:00:00 +0200
categories: ["computer science"]
tag: [software, security]
---
**General Philosophy**

1. Peer to peer services provides a level of privacy not available with services such as Coinbase and Cash App.
2. Bisq never holds your funds. Private keys remain in your possession. 
3. Trades are secured with a 2 of 2 multisig wallet and security deposits.

**Bisq on Tails**

Recently, Bisq released an update to run over torsocks. Here is a short guide to avoid some headaches.  Most of the script was initially borrowed from [@sejktmcsdlmfhsc](https://github.com/sejktmcsdlmfhsc) on [github issue #2278](https://github.com/bisq-network/bisq/issues/2278) and later updated by the Bisq team with this [post](https://bisq.wiki/Running_Bisq_on_Tails).

Follow the script below for linux. It should be rather straight forward. We are creating a directory and linking a backup file for Bisq to recognize at runtime.

Finally, we will fire up our copy Bisq.  You may need to run this as a sudo user depending on your permission on the system.  If you don't know what is going on here, slow down.

```bash
#!/bin/bash

# Change to the location of your Bisq package.
sudo dpkg -i /media/amnesia/Bisq-64bit-1.3.7.deb

#make authcookie readable:
sudo chmod o+r /var/run/tor/control.authcookie
mkdir -p /home/amnesia/.local/share/Bisq
ln -r -s /media/amnesia/Persistent/bisq/backup/bisq_backup_date/* /home/amnesia/.local/share/Bisq
sudo sed -i "s|Exec=/opt/Bisq/Bisq --torControlPort 9051 --torControlCookieFile=/var/run/tor/control.authcookie --torControlUseSafeCookieAuth --socks5ProxyHttpAddress=127.0.0.1:9050 --socks5ProxyBtcAddress=127.0.0.1:9050 --useTorForBtc=True|" /usr/share/applications/Bisq.desktop

sudo echo '---
- apparmor-profiles:
    - '/opt/Bisq/Bisq'
  users:
    - 'amnesia'
  commands:
    AUTHCHALLENGE:
      - 'SAFECOOKIE .*'
    SETEVENTS:
      - 'CIRC WARN ERR'
      - 'CIRC ORCONN INFO NOTICE WARN ERR HS_DESC HS_DESC_CONTENT'
    GETINFO:
      - 'net/listeners/socks'
    ADD_ONION:
      - pattern:     'NEW:(\S+) Port=9999,(\S+)'
        replacement: 'NEW:{} Port=9999,{client-address}:{}'
      - pattern:     '(\S+):(\S+) Port=9999,(\S+)'
        replacement: '{}:{} Port=9999,{client-address}:{}'
    DEL_ONION:
      - '.+'
    HSFETCH:
      - '.+'
  events:
    CIRC:
      suppress: true
    ORCONN:
      suppress: true
    INFO:
      suppress: true
    NOTICE:
      suppress: true
    WARN:
      suppress: true
    ERR:
      suppress: true
    HS_DESC:
      response:
        - pattern:     '650 HS_DESC CREATED (\S+) (\S+) (\S+) \S+ (.+)'
          replacement: '650 HS_DESC CREATED {} {} {} redacted {}'
        - pattern:     '650 HS_DESC UPLOAD (\S+) (\S+) .*'
          replacement: '650 HS_DESC UPLOAD {} {} redacted redacted'
        - pattern:     '650 HS_DESC UPLOADED (\S+) (\S+) .+'
          replacement: '650 HS_DESC UPLOADED {} {} redacted'
        - pattern:     '650 HS_DESC REQUESTED (\S+) NO_AUTH'
          replacement: '650 HS_DESC REQUESTED {} NO_AUTH'
        - pattern:     '650 HS_DESC REQUESTED (\S+) NO_AUTH \S+ \S+'
          replacement: '650 HS_DESC REQUESTED {} NO_AUTH redacted redacted'
        - pattern:     '650 HS_DESC RECEIVED (\S+) NO_AUTH \S+ \S+'
          replacement: '650 HS_DESC RECEIVED {} NO_AUTH redacted redacted'
        - pattern:     '.*'
          replacement: ''
    HS_DESC_CONTENT:
      suppress: true' /etc/onion-grater.d/bisq.yml
sudo service onion-grater restart

#and start Bisq:
/opt/Bisq/Bisq --torControlPort 9051 --torControlCookieFile=/var/run/tor/control.authcookie --torControlUseSafeCookieAuth --socks5ProxyHttpAddress=127.0.0.1:9050 --socks5ProxyBtcAddress=127.0.0.1:9050 --useTorForBtc=True
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

