const {app, BrowserWindow, Menu} = require('electron')

// const debug = require('electron-debug');
// debug();

let mainWindow;


function createWindow () {
	mainWindow = new BrowserWindow({
		width: 1100,
		height: 660,
		center: true,
		maxWidth: 1100,
		minWidth: 1100,
		maxHeight: haut,
		minHeight: haut,
		icon: __dirname + icon,
		useContentSize: true,
		webPreferences: {
			nodeIntegration: true
		}
	})
	  
  	mainWindow.loadURL('http://localhost:1903/login.html');

  	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

if (process.platform.toLowerCase()  == 'win32'){
	haut  = 680
	icon = `/src/foyer.ico`
}
else{
	haut = 660
	icon = `/src/foyer.png`
}


app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
if (mainWindow === null) createWindow()
})

const menu = Menu.buildFromTemplate(
	[
		{
			label: "Fichier",
			submenu: [
				{
					label: "Fermer la fenetre",
					click: function(){
						app.quit()
					}
				}
			]
		},
		{
			label: "Edition",
			submenu : [
				{
					label: "Mode Sombre",
					click: function(){
						mainWindow.backgroundColor = 'black';
					}
				}
			]
		},
		{
			label: "Apropos"
		},
		{
			label: "Aide"
		}
	]
);

Menu.setApplicationMenu(menu);