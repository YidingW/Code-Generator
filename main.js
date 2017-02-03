'use strict';

const {
    app,
    BrowserWindow,
    ipcMain,
    dialog,
    Menu
} = require('electron');
const os = require('os');

require('electron-reload')(__dirname);

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            preload: __dirname + '/preload.js'
        }
    });

    var menu = Menu.buildFromTemplate([{
        label: 'Action',
        submenu: [{
                label: 'Add Model',
                accelerator: 'CmdOrCtrl+Up',
                click: () => {
                    mainWindow.webContents.send('new-model-event');
                }
            },
            {
                label: 'Export Model(s)',
                accelerator: 'CmdOrCtrl+Right',
                click: () => {
                    mainWindow.webContents.send('export-model-event')
                }
            },
            {
                label: 'Clear all',
                accelerator: 'CmdOrCtrl+K',
                click: () => {
                    mainWindow.webContents.send('clear-model-event')
                } 
            }
        ]
    }]);

    Menu.setApplicationMenu(menu);

    mainWindow.webContents.openDevTools(); //remove this when deploy

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    mainWindow.on('closed', _ => {
        mainWindow = null
    })
});


ipcMain.on('file-save-error', (event, data) => {
    app.focus();
    console.log(data);
    dialog.showErrorBox('Error!', data);
});