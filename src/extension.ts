// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "countdown to leaving work" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("countdown", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage("Hello World from countdown!");
  });
  let tab = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    0
  );

  function countTime() {
    // 获取现在得时间毫秒数
    let nowTime = new Date().getTime();
    let endDate = new Date();
    let hours =
      Number(vscode.workspace.getConfiguration().get("set.hover")) || 17;
    let minute =
      Number(vscode.workspace.getConfiguration().get("set.minute")) || 30;
    endDate.setHours(hours);
    endDate.setMinutes(minute);
    endDate.setSeconds(0);
    let endTime = endDate.getTime();
    console.log();
    let timeDiff = endTime - nowTime;
    let time = "";
    if (timeDiff >= 0) {
      time = `距离下班还有： ${Math.floor(
        (timeDiff / 1000 / 60 / 60) % 24
      )}小时 ${Math.floor((timeDiff / 1000 / 60) % 60)} 分钟 ${Math.floor(
        (timeDiff / 1000) % 60
      )}秒`;
      tab.text = time;``;
      tab.show();
    } else {
      tab.text = "下班！到点了，你需要关机跑路了！";
      tab.color = "yellow";
      tab.show();
      return;
    }

    setTimeout(countTime, 1000);
  }
  setTimeout(()=>{
    countTime();
  },1000*60*60*12);
  

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
