import * as vscode from 'vscode';
import { getWebviewContent } from './webviewContent';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('jsonVisualizer.showGraph', () => {
        const panel = vscode.window.createWebviewPanel(
            'jsonVisualizer',
            'JSON Graph',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        const editor = vscode.window.activeTextEditor;
        let jsonData = editor ? editor.document.getText() : '{}';

        panel.webview.html = getWebviewContent(jsonData);
    });

    context.subscriptions.push(disposable);
}
