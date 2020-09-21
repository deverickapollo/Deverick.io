---
layout: post
title:  "Building a Malware Lab in Qubes"
date:   2020-09-17 9:00:00 +0200
categories: security
---

I've been moving to Qubes OS this past year. This past week I needed a windows hacking lab for some research.  I am going to isloate the network from the other VMs to prevent any malicious code from getting out of control.  

**Installation**  

```qvm-create -s --label red --hvm win10```  
```qvm-prefs -s win10 memory 4096```  
```qvm-start --cdrom=OtherVM:/home/user/Downloads/SomeWindowsISO.iso win10```  
```qvm-start win10```

**Windows 10 Install**  
Follow the windows installation instructions [here](https://www.qubes-os.org/doc/windows-vm/)

1. Update the OS  
2. Install desired software  
	1.Ollydbg  
	2. Brave Browser  
	3. Wireshark  
3. qvm-clone win10 win10-backup  

**Networking VM**  
We need a proxy machine to send traffic. Some malware will reach out to the web and we need respond.  

1. Deploy Debian VM  
2. Install INetSim and PolarProxy. (Link)[https://www.netresec.com/?page=Blog&month=2019-12&post=Installing-a-Fake-Internet-with-INetSim-and-PolarProxy]  
	1. Setup a Dummy interface
		1. ```sudo lsmod | grep dummy```  
		2. ```sudo modprobe dummy```  
		3. ```sudo lsmod | grep dummy```  
		4. ```sudo ip link add eth10 type dummy```  
		5. ```ip link show eth10```  

**Penetration Testing Box**  
We will install avoid the bloat that is kali and install a custom linux with a few useful tools.



**Installing**  

To be continued....
