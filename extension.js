// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('express-skeleton.generator', async function () {
		// The code you place here will be executed every time your command is executed

		// Setting options for inputBox and openDialog
		const inputBoxOptions = {
			'prompt': 'Enter a name for your project',
			'placeHolder': 'Example: myApp'
		}
		const openDialogOptions = {
			'canSelectFiles': false,
			'canSelectFolders': true
		}

		// User defines project name
		const projectName = await vscode.window.showInputBox(inputBoxOptions);

		if (!projectName) {
			vscode.window.showInformationMessage('Your project name can\'t be empty');
			return
		}

		// User selects folder where project will be created
		const projectPath = await vscode.window.showOpenDialog(openDialogOptions);

		// The resulting object is an array with an object inside so
		// to acces the actual path you should use projectPath[0].path
		if (!projectPath) {
			vscode.window.showInformationMessage('You need to select a folder to create your app in it');
			return
		}

		// A terminal is created
		// The specified path is defined as the current working directory of the terminal
		const terminalOptions = {
			'cwd': projectPath[0].path
		}
		const terminal = vscode.window.createTerminal(terminalOptions);

		// The express-generator is run with npx
		terminal.sendText('npx express-generator ' + projectName);

		// This opens the project created in the same VSCode window
		terminal.sendText('code -r ' + projectName);

		// Notification messages to let the user know the extension did its job
		vscode.window.showInformationMessage('Happy coding!')
		vscode.window.showInformationMessage('Project \'' + projectName + '\' succesfully created');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
