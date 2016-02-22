Qos Plus
=================
Installation
-----------------
For install a local server we use Vagrant and a personnal Vagrant Box

In your terminal type : 

    vagrant init Younesta/meanbox; vagrant up --provider virtualbox
    vagrant plugin install vagrant-vbguest

If you have problem to localize the plugin : 

    sudo ln -s /opt/VBoxGuestAdditions-4.3.10/lib/VBoxGuestAdditions /usr/lib/VBoxGuestAdditions


