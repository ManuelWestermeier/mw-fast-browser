// electron/main.js
import { log } from 'console';
import { app, BrowserWindow, globalShortcut } from 'electron';
import express from "express"
import loadExtensions from './load-extension.js';
const isDev = process.env.NODE_ENV == 'development';

if (!isDev) {
    try {
        const server = express()
        const assetsPath = '../assets';
        server.use(express.static(assetsPath));
        server.listen(56722)
    } catch (error) {
        log(error)
    }
}

async function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        icon: isDev ? "public/logo.png" : "../assets/logo.png",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true
        },
    });

    mainWindow.loadURL('http://localhost:56722'); // Load from Vite dev server in development

    // Maximize and focus the window
    mainWindow.maximize();
    mainWindow.focus();


    // Register global shortcut when window is focused
    mainWindow.on('focus', () => {
        globalShortcut.register('Control+Tab', () => {
            mainWindow.webContents.send('KeyDown::Control+Tab', '');
        });
        globalShortcut.register('Control+T', () => {
            mainWindow.webContents.send('KeyDown::Control+T', '');
        });
        globalShortcut.register('Control+W', () => {
            mainWindow.webContents.send('KeyDown::Control+W', '');
        });
        globalShortcut.register('Alt+Left', () => {
            mainWindow.webContents.send('KeyDown::Left', '');
        });
        globalShortcut.register('Alt+Right', () => {
            mainWindow.webContents.send('KeyDown::Right', '');
        });
    });

    // Unregister all global shortcuts when the window loses focus
    mainWindow.on('blur', () => {
        globalShortcut.unregisterAll();
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    loadExtensions();
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});