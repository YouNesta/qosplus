Qos Plus
=================
Installation
-----------------
For install a local server we use Vagrant and a personnal Vagrant Box

In your terminal type : 

    vagrant plugin install vagrant-vbguest
    
    ssh-keygen  // Just press enter for all prompt
    vagrant up --provision
    vagrant ssh
    sudo ln -s /opt/VBoxGuestAdditions-4.3.30/lib/VBoxGuestAdditions /usr/lib/VBoxGuestAdditions
    
    

Don't forget you need to make two "npm install" one in /meanApp the order in /meanApp/myApp


