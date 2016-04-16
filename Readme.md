Qos Plus
=================
Installation
-----------------
## Features

### Configuration

- Debian 7.3 LTS (Trusty Tahr)
- Node 5.10
- Git 2.1.4
- Npm 3.8.3
- Jspm 0.16.33
- Mongo 3.0.9

### Express Package

- Nodemon 1.9.1
- Lite-Server 2.2.0
- Pm2 1.1.2



## Get Started

* Download and Install [Vagrant][1]
* Download and Install [VirtualBox][2]
* Clone the Qos Box [GitHub Repository][3]
```bash
git clone https://github.com/YounesBoulkaddid/qosplus;
```
* Run Qos Box

```bash
vagrant up;
```

* Ssh connection Qos Box

```bash
vagrant ssh;
```

* Install Node Server

```bash
cd /vagrant/meanApp;
cp config/config.js.old config/config.js;
npm install;
```

* Run Node Server

```bash
cd /vagrant/meanApp;
nodemon;

OR

pm2 start /vagrant/meanApp/bin/www;

```
* Access API at  [http://192.168.33.10:8080/][4]


* Install Angular App 

```bash
cd /vagrant/myApp;
cp app/Config/api.ts.old app/Config/api.ts;
jspm install;
npm install;
typings install;
```

* Run Angular App 

```bash
cd /vagrant/myApp;
lite-server;

OR

pm2 start /vagrant/myApp/app.js;
```

* Access Your Project at  [http://192.168.33.10:3000/][4]

## Basic Vagrant Commands


### Start or resume your server
```bash
vagrant up
```

### Pause your server
```bash
vagrant suspend
```

### Delete your server
```bash
vagrant destroy
```

### SSH into your server
```bash
vagrant ssh
```




## Database Access

### MongoDB

- Hostname: 127.0.0.1
- Database: qosPlus
- Username: qosPlus
- Password: qosPlus
- Port: 27017


## SSH Access

- Hostname: 127.0.0.1:2222
- Username: vagrant
- Password: vagrant


## Updating the Box

Although not necessary, if you want to check for updates, just type:

```bash
vagrant box outdated
```

It will tell you if you are running the latest version or not, of the box. If it says you aren't, simply run:

```bash
vagrant box update
```


## Setting a Hostname

If you're like me, you prefer to develop at a domain name versus an IP address. If you want to get rid of the some-what ugly IP address, just add a record like the following example to your computer's host file.

```bash
192.168.33.10:3000 dev.qosplus.com
```

Or if you want "www" to work as well, do:

```bash
192.168.33.10:3000 dev.qosplus.com www.dev.qosplus.com
```



 [1]: https://www.vagrantup.com/downloads.html
 [2]: https://www.virtualbox.org/wiki/Downloads
 [3]: https://github.com/YounesBoulkaddid/qosplus
 [4]: http://192.168.33.10:3000/