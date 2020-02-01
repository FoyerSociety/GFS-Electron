#!/bin/bash

rouge='\e[0;31m'
vert='\e[0;32m'
orange='\e[0;33m'
neutre='\e[0;m'

if [ $USER != 'root' ]; then
    echo -e "${orange}(erreur)${rouge} Veuillez passer en mode root ✘ ${neutre}"
    exit 1
fi

if [ $# -gt 0 ] ; then
		if [ $1 = '--docker' ]; then
			addr="127.0.0.1"
            echo "tonga eto"
		else
			echo -e "${orange} argument inconnu: $1 ${neutre}"
			exit 1
		fi
else
		addr="localhost"
fi

mysql -e "CREATE USER 'foyer'@'$addr' IDENTIFIED BY 'foyer' ; 
    GRANT ALL PRIVILEGES ON *.* TO 'foyer'@'$addr' ;
    FLUSH PRIVILEGES ; CREATE DATABASE foyer; "

if [ $? != 0 ]; then
     echo -e "${orange}(erreur)${rouge} une erreur de connection  avec la base de donnée ✘ ${neutre}"
     exit 1
fi

mysql -h $addr foyer < ./db/foyer-sample.sql


if [ $? = 0 ]; then
	echo -e "${vert} Succes ✓ ${neutre}"
else
     echo -e "${orange}(erreur)${rouge} erreur lors de l 'importation du fichier sql ✘ ${neutre}"
     exit 1
fi
