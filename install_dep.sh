#!/bin/bash 
# __Author__ Gaetan Jonathan 

rougefonce='\e[0;31m'
vertfonce='\e[0;32m'
orange='\e[0;33m'
neutre='\e[0;m'

npm_file=`which npm`
echo -e "\nVérification...\n"
if [ $npm_file = "npm not found" ]
then
    echo -e "${rougefonce} n'est pas trouvé \n${neutre} Installer d'abord node"
else 
    echo -e "${vertfonce} npm trouvé \n node trouvé\n${neutre}"
fi

if [ -e "env" ] && [ -d "env" ]
then
    if [ -e "env/bin/python" ]
    then
        echo -e "${vertfonce} env python trouvé:${neutre} `env/bin/python --version`\n"
    fi
else
    echo -e "${orange} Aucun env trouvé\n${neutre} Création de env python..."
    python3 -m venv ./env
    echo -e "\n${vertfonce} env créer avec success${neutre}"
fi

echo -e "\nInstallation dependance python\n${neutre}"
env/bin/pip install -r requirements.txt

echo -e "\nInstallation dependance npm${neutre}"
npm i jquery
electron_file=`which electron`
if [ $electron_file = "electron not found" ]; then
    npm i electron 
fi

echo -e "${vertfonce}\n Electron et JQuery Installer \n${neutre}"


echo -e "\n Installation dependance Terminer\n${neutre}"
