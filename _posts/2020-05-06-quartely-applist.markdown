---
layout: post
title:  "App of the Month"
date:   2020-05-04 19:38:27 +0200
categories: apps
---

![Session App](/assets/Session/SESSION_Vert.png "Session App")

The Loki Foundation has published a new end-to-end encrypted messenger this past month. The session app is a privacy-focused messenger with a simple mission, to provide anonymous communication.  Lets highlight some security features of the app that were interesting to me.  

**Session leverages three different technologies:**

1. For sender anonymity, the **tor onion protocol** has been implemented to route messages securely.

2. To handle asymmetric encryption between parties, the session app takes advantage of the open source **OTR messaging protocol** libraries provided by Signal. 

3. Lastly, messages are stored on the **Loki Network**. This provides a distinct difference from its immediate competitor, Signal.  Although these messages are encrypted/decrypted using state of the art technologgy, the Signal App relies on central servers to store messages whereas Session App stores its message on the Loki Network.

**What is Perfect Forward Secrecy and why is it important?**

C.G. Günther coined the term "perfect forward secrecy" in 1990.  It is used to describe a property of encryption systems in which the exposure of the long term shared secret does not compromise the confidentiality of a group of messages.  To accomplish this, the encryption system generates session keys between the client and server for each message transmitted.  In the event session keys have been compromised, access to the system does not compromise the confidentiality of messages.

It's nice to see blockchain projects finally delivering products of value.  Session Messenger is available on most Operating Systems, including android and ios for mobile and Linux, MacOS and Windows for desktop.  Take a moment to grab the app for your favorite system and give it a try.  

For further information, please visit the main website at [https://getsession.org/](https://getsession.org/)

