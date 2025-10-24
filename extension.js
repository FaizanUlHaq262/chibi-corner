// extension.js
const vscode = require('vscode');
const path = require('path');

function activate(context) {
    console.log('Chibi Corner activated!');

    const provider = new ChibiViewProvider(context.extensionUri);
    
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            'chibiCorner',
            provider,
            {
                webviewOptions: {
                    retainContextWhenHidden: true
                }
            }
        )
    );
}

class ChibiViewProvider {
    constructor(extensionUri) {
        this._extensionUri = extensionUri;
    }

    resolveWebviewView(webviewView) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                this._extensionUri,
                ...(vscode.workspace.workspaceFolders || []).map(folder => folder.uri)
            ]
        };

        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            webviewView.webview.html = this._getNoWorkspaceHtml();
            return;
        }

        // Try to find the GIF - first in extension folder, then in workspace
        const fs = require('fs');
        const possiblePaths = [
            // Check extension's own media folder first (bundled with extension)
            path.join(this._extensionUri.fsPath, 'media', 'chibi-gif-2.gif'),
            // Then check workspace locations
            path.join(workspaceFolder.uri.fsPath, 'media', 'chibi-gif-2.gif'),
            path.join(workspaceFolder.uri.fsPath, 'media2', 'chibi-gif-2.gif'),
            path.join(workspaceFolder.uri.fsPath, 'chibi-gif-2.gif'),
            path.join(workspaceFolder.uri.fsPath, '..', 'media', 'chibi-gif-2.gif'),
        ];

        let gifPath = null;
        for (const testPath of possiblePaths) {
            if (fs.existsSync(testPath)) {
                gifPath = testPath;
                console.log('Found GIF at:', gifPath);
                break;
            }
        }

        if (!gifPath) {
            webviewView.webview.html = this._getNoGifHtml();
            return;
        }

        const gifUri = webviewView.webview.asWebviewUri(vscode.Uri.file(gifPath));

        webviewView.webview.html = this._getHtmlContent(gifUri);
    }

    _getNoWorkspaceHtml() {
        return `<!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    color: #888;
                    text-align: center;
                    padding: 20px;
                }
            </style>
        </head>
        <body>
            <div>
                <p>Open a workspace to see Chibi!</p>
            </div>
        </body>
        </html>`;
    }

    _getNoGifHtml() {
        return `<!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    color: #888;
                    text-align: center;
                    padding: 20px;
                }
            </style>
        </head>
        <body>
            <div>
                <p>😢</p>
                <p>Could not find chibi-gif.gif</p>
                <p style="font-size: 12px;">Looking in: media/, media2/, or root folder</p>
            </div>
        </body>
        </html>`;
    }

    _getHtmlContent(gifUri) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    padding: 10px;
                    background: transparent;
                }
                img {
                    width: 180px;
                    height: auto;
                    display: block;
                }
            </style>
        </head>
        <body>
            <img src="${gifUri}" alt="Chibi Animation">
        </body>
        </html>`;
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};