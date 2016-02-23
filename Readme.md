Qos Plus
=================
Installation
-----------------
For install a local server we use Vagrant and a personnal Vagrant Box

In your terminal type : 

    vagrant plugin install vagrant-vbguest
    vagrant up --provider virtualbox
    vagrant ssh
    sudo ln -s /opt/VBoxGuestAdditions-4.3.10/lib/VBoxGuestAdditions /usr/lib/VBoxGuestAdditions
    sudo ln -s /home/vagrant /usr/lib/VBoxGuestAdditions


Don't forget you need to make two "npm install" one in /meanApp the order in /meanApp/myApp


