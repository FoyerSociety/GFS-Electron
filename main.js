const {app, BrowserWindow, Menu} = require('electron')

//const debug = require('electron-debug')
//debug()

let mainWindow;


function createWindow () {
	mainWindow = new BrowserWindow({
		width: larg,
		height: haut,
		center: true,
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
	haut  = 601
	larg =  974
	icon = `/src/foyer.ico`
}
else{
	haut = 601
	larg = 972
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
					label: "Fermer la fenêtre",
					click: function(){
						app.quit()
					}
				}
			]
		},

		{
			label: "Edition",
			submenu: [
				{
					label: "Mode Sombre"
					
				}
			
			]
		},

		{
			label: "Apropos",
			submenu: [
				{
					label: "Developers"
					
				},

				{
					label: "Logiciel"
					
				},

				{
					label: "License"
					
				}
			
			]
		}
	]
);

Menu.setApplicationMenu(menu);