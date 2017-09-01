import fs = require('fs');
import path = require('path');
import tl = require('vsts-task-lib/task');
//npm install vsts-task-lib




async function run() {
    try {
        // Get task parameters
        let command: string = tl.getInput("Command");
        let sourceFile: string = path.normalize(
            tl.getPathInput('SourceFile', false, true)
        );
        let newName: string = tl.getInput("NewName", false);

        switch (command) {
            case "rename":
                let dir: string = path.dirname(sourceFile);
                fs.renameSync(
                    sourceFile,
                    dir + path.delimiter + newName
                )
                break;

            default:
                break;
        }

        tl.setResult(tl.TaskResult.Succeeded, 'Succeeded');
    } catch (err) {
        tl.error(err.message);
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
