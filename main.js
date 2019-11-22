const {app, BrowserWindow, Menu} = require('electron')
const $ = require('jquery')

const debug = require('electron-debug');

debug();

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
		useContentSize: true,
		backgroundColor: 'black',
		webPreferences: {
			nodeIntegration: true
		}
	})
	  
  	mainWindow.loadURL('http://localhost:8000/login.html');

  	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

if (process.platform.toLowerCase()  == 'win32'){
	haut  = 680
}
else{
	haut = 660
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
// On macOS it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
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