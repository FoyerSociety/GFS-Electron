#!/bin/bash 

rouge='\e[0;31m'
vert='\e[0;32m'
orange='\e[0;33m'
neutre='\e[0;m'


isArch=`which pacman`

if [ $USER != "root" ]; then
    echo -e "${rouge} Veuillez passer en mode root ✘ \n${neutre}"
    exit 1
fi

# Premier dependance d'installation
# ----------------------------------------------
echo "Verification node/npm"
npm_file=`which npm`

if [ $npm_file = "npm not found" ]; then
    echo -e "${rouge} npm n'est pas trouvé ✘ \n Installer nodejs ${neutre}"
else
    echo -e "${vert} npm trouvé ✓\n node trouvé ✓${neutre}"
fi
#  -------------------------------------------

# deuxieme dependance 
# ******************************************
echo "Verification electron"
electron_path=`which electron`

if [ $electron_path = "electron not found" ]; then
    echo -e "${rouge} electron non trouvé ✘${neutre}"

    echo "Installation electron"

    if [ isArch =  "pacman not found" ]; then
        npm i electron -g 
    else
        pacman -S electron
    fi
else
    echo -e "${vert} electron trouvé ✓${neutre}"
fi
# *********************************************

# troisieme dependance 
# -------------------------
echo "Installation librairie Python"
python3 -m pip install -r requirements.txt
# -------------------------


# quatrieme dependance
# ****************************************************************
# ici se trouve les dependances via nodejs
echo -e "\nVerification JQuery"
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
else
    echo -e "${vert} JQuery trouvé ✓${neutre}"
fi

echo -e "\n${vert}Verification terminée\n${neutre}"
# ****************************************************************

sleep 2 

####  INSTALLATION ############
echo -e "Installation..."
echo -e '#!/bin/bash\ncd /opt/FoyerSociety/\n./foyerApp.py' > foyerApp && chmod +x foyerApp
if [ -e /opt/FoyerSociety ]
then
	rm -r /opt/FoyerSociety
fi
mkdir /opt/FoyerSociety
set -x
cp -rf src eel.js main.js foyerApp db.linux package* view /opt/FoyerSociety/
chmod +x main.py && cp main.py /opt/FoyerSociety/foyerApp.py
if [ -e "node_modules" ] && [ -d "node_modules" ]; then
    cp -r node_modules /opt/FoyerSociety
fi
rm foyerApp
set +x

echo -e "\nCréation de bureau et application dans le système"
ln -sf /opt/FoyerSociety/foyerApp /usr/bin/foyerApp
cp -f src/foyerApp.desktop /usr/share/applications/
chmod +x /usr/share/applications/foyerApp.desktop


echo -e "#!/bin/bash\n  rm -rf /opt/FoyerSociety/ /usr/share/applications/foyerApp.desktop /usr/bin/foyerApp*" > .unin.tmp
mv .unin.tmp /usr/bin/foyerApp-uninstall
echo -e "\n\n${vert}INSTALLATION TERMINEE ${neutre}\n\n"