# GestionFoyer
Une plateforme pour gérer le fonctionnement du foyer (répas, cotisation, jirama,  ménage, ...)


## Installation

### LINUX (tested on Arch)

`$ git clone https://github.com/FoyerSociety/GestionFoyer.git`

`$ cd GestionFoyer && git checkout -f linux-stable`

`$ sudo ./install-v2.sh`


#### Debian
  
  Pour l'installation des systèmes basés sous Debian (Ubuntu, Elementary, Linux Mint,...)
  
  Il est parfois mieux d'installer electron executable que par npm ( sauf si vous en avez deja fonctionnel)
  
  * Telecharger electron compatible avec votre OS [ici](https://github.com/electron/electron/releases)
  * Decompresser et Placer dans un endroit fixe. (/opt/ recommandé)
  * Créer un lien symbolique: `# ln -sf {full_path_of_electron_dir}/electron /usr/bin/electron`

### Windows (tested on Win 10)
- Build from source

  ` git clone https://github.com/FoyerSociety/GestionFoyer.git`

  ` git checkout -f windows-stable`

    * Installer nodejs
    * Installer electron (avec npm) `npm install electron`
    
  `python main.py`

          Ce qui ouvrira au premier temps une fenetre de verification de dependance

 - Install executable (Version  with all dependances)

     **Download** [FoyerApp-1.0.0-alpha.exe](https://github.com/FoyerSociety/GestionFoyer/releases/download/1.0.0-alpha/foyerApp.exe)
     
     FoyerApp-2.0.3.exe ( Comming Soon )


## Dependances

    * python >= 3.6 
    * nodejs / npm
    
 <img src="https://github.com/FoyerSociety/GestionFoyer/blob/master/src/dependances.PNG" align="center">
    
## Developpeurs
<table>
 <tr>
    <td align="center"><a href="gaetan1903.github.com"><img src="https://avatars0.githubusercontent.com/u/43904633?s=460&v=4" width="150px;" height="150px;" alt="Gaetan Jonathan"/> </td>
     <td align="center"><a href="Landris18.github.com"><img src="https://avatars0.githubusercontent.com/u/47665507?s=400&v=4" width="150px;" height="150px;" alt="Landry Daniel"/> </td>
 </tr>
 <tr>
  <td> Gaetan Jonathan :grin: </td>
  <td> Landry Daniel :smiley: </td>
 </tr>
</table>
