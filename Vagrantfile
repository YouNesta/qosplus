# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "Younesta/meanbox"

  # config.vm.box_check_update = false


   config.vm.network "private_network", ip: "192.168.33.10"


  config.vm.synced_folder ".", "/vagrant", :owner => 'vagrant', :group => 'www-data', :mount_options => ["dmode=775", 'fmode=775']

 

  config.ssh.insert_key = false
  # config.ssh.private_key_path = "~/.ssh/id_rsa"
  #config.ssh.forward_agent = true

  config.ssh.private_key_path = "~/.ssh/id_rsa"
  config.ssh.forward_agent = true
  config.ssh.username = 'vagrant'
  config.ssh.password = 'vagrant'


   config.vm.provision "shell", inline: <<-SHELL
     sudo chown vagrant:vagrant /home/vagrant/public
     ln -s /vagrant/meanApp/ /home/vagrant/public/
   SHELL
end
