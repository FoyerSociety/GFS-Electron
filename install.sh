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
    echo -e "${rougefonce} electron non trouvé ✘\n${neutre} Installer electron\n\n"
		echo -e "1: Arch \n2: Autre\n"
		read -p '[1/2]>> ' distro
		
		if [ $distro = 1 ]
		then
						sudo pacman -S electron
		elif [ $distro = 2 ] 
		then
						npm install -g electron
		else
					exit
		fi
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

val="False"
if [ -e "node_modules" ] && [ -d "node_modules" ]
then
    npm_modules=`ls node_modules`
    for dep in $npm_modules
    do
        if [ $dep = "jquery" ]
        then
            val="True"
        fi
    done
fi


if [ $val = "False" ]
then
    echo -e "\nInstallation JQuery...\n"
    npm i jquery
fi

echo -e "\n${vertfonce}Verification terminée\n\n${neutre}"

sleep 2

echo -e "\nInstallation dependance npm${neutre}"

set -x
echo -e '#!/bin/bash\ncd /opt/FoyerSociety/\n./foyerApp.py' > foyerApp && chmod +x foyerApp
chmod +x ./change_env.py 
./change_env.py
chmod +x foyerApp.py
if [ -e /opt/FoyerSociety ]
then
	sudo rm -r /opt/FoyerSociety
fi
sudo mkdir /opt/FoyerSociety 
sudo cp -rf src eel.js env main.js foyerApp.py foyerApp db.linux package* view /opt/FoyerSociety/
set +x 

if [ -e "node_modules" ] && [ -d "node_modules" ]; then
    sudo cp -r node_modules /opt/FoyerSociety
fi

rm foyerApp foyerApp.py

echo -e "\n Création de Bureau et Application dans le systeme"
set -x
sudo ln -sf /opt/FoyerSociety/foyerApp /usr/bin/foyerApp
sudo cp -f src/foyerApp.desktop /usr/share/applications/
sudo chmod +x /usr/share/applications/foyerApp.desktop
set +x
echo -e "#!/bin/bash\nsudo rm -rf /opt/FoyerSociety/ /usr/share/applications/foyerApp.desktop /usr/bin/foyerApp*" > .unin.tmp
sudo mv .unin.tmp /usr/bin/foyerApp-uninstall
echo -e "\n\n${vertfonce}INSTALLATION TERMINEE ${neutre}\n\n"



