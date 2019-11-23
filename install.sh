#!/bin/bash 
# __Author__ Gaetan Jonathan 

rougefonce='\e[0;31m'
vertfonce='\e[0;32m'
orange='\e[0;33m'
neutre='\e[0;m'

npm_file=`which npm`
electron_file=`which electron`

echo -e "\nVérification...\n"
sleep 2
if [ $npm_file = "npm not found" ]
then
    echo -e "${rougefonce} npm n'est pas trouvé ✘ \n${neutre} Installer Node/NPM"
    exit
else 
    echo -e "${vertfonce} npm trouvé ✓\n node trouvé ✓${neutre}"
fi

if [ $electron_file = "electron not found" ]; then
    echo -e "${rougefonce} electron non trouvé ✘\n${neutre} Installer electron\n\n apt-get install electron (basé Debian) \n pacman -S electron (basé Arch) \n  npm i electron -g (Autre)\n"
    exit
else
    echo -e "${vertfonce} electron trouvé ✓${neutre}"
fi

if [ -e "env" ] && [ -d "env" ]
then
    if [ -e "env/bin/python" ]
    then
        echo -e "${vertfonce} env python trouvé:${neutre} `env/bin/python --version`\n"
    fi
else
    echo -e "${orange} Aucun env trouvé ✘\n${neutre} Création de env python..."
    python3 -m venv ./env
    echo -e "\n${vertfonce} env créer avec success ✓${neutre}"
fi

echo -e "\nInstallation dependance python\n${neutre}"
set -x
env/bin/pip install -r requirements.txt
set +x
sleep 1

echo -e "\nInstallation dependance npm${neutre}"
sleep 2

npm_modules=`ls node_modules`
val="False"
for dep in $npm_modules
do
    if [ $dep = "jquery" ]
    then
        val="True"
    fi
done

if [ $val = "False" ]
then
    echo -e "\nInstallation JQuery...\n"
    npm i jquery
fi

echo -e "\n${vertfonce}Verification terminée\n\n${neutre}"

sleep 2

echo -e "\nInstallation dependance npm${neutre}"

set -x
sudo rm -r /opt/FoyerSociety && sudo mkdir /opt/FoyerSociety 
sudo cp -rf src/foyer.png eel.js env main.js main.py db.linux package.json package-lock.json view /opt/FoyerSociety/
set +x 

if [ -e "node_modules" ] && [ -d "node_modules" ]
then
    cp -rf node_modules /opt/FoyerSociety/
fi


echo -e "\n Création de Bureau et Application dans le systeme"
set -x
sudo ln -sf /opt/FoyerSociety/main.py /usr/bin/foyerApp
sudo cp -f src/FoyerApp.desktop /usr/share/applications/
sudo chmod 777 /usr/share/applications/FoyerApp.desktop
set +x

echo -e "\n\n${vertfonce}INSTALLATION TERMINEE ${neutre}\n\n"



