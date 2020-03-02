## Installing Site
Hypothetically you should be able to run lando and docksal at the same time without any problem. The shutdown steps
are not based on anything besides personal paranoia.
1. $ lando poweroff
2. Exit docker

## Install Docksal USING VIRTUALBOX
1. Follow virtualbox install instructions https://docksal.io/installation#macos-virtualbox
2. bash <(curl -fsSL https://get.docksal.io)
3. fin system start

## Configure Terminus
1. Edit ~/.docksal/.docksal.env and paste:
SECRET_TERMINUS_TOKEN="$yourmachinetoken"

## Install Homebrew and Composer
1. /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
2. brew install composer

## Setup Project
1. cd ~/Projects
2. $ git clone  https://github.com/o3world/vertexinc && cd vertexinc
3. fin init

## Troubleshooting
If things stop working (which sometimes happens if battery gets low) just reboot everything.
$ fin vm restart

If things really stop working, you may need to reinstall docksal. * DO NOT MANUALLY DELETE THE DOCKSAL VM *
1. $ fin system stop
2. $ fin vm remove
3. $ rm -rf “$HOME/.docksal”
4. $ rm -f /usr/local/bin/fin

Then follow instructions from the top.

## Drush
fin drush (command) --args

## Commands
fin init : Reset containers, install composer, install npm, fix file perms, grabs database, grabs files, rebuilds cache, imports config

fin vrt : Run visual regression test

## Using `pullfrom` to pull db/files from specific pantheon environment
We created a custom Docksal command that will change your .docksal-local then pull the db/files from the specified environment

`fin pullfrom <environment>`

## Dependencies
The commands `fin init` and `fin compile` should install and update all dependencies.

If any node packages are added or updated manually via npm, run the command `npm shrinkwrap` afterward. This will save the exact dependency versions to a version-controlled `npm-shrinkwrap.json` file, making sure all developers on the project are using the same dependencies.