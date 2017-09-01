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
                let newFile = dir + path.delimiter + newName;
                if (fs.existsSync(newFile)) {
                    throw 'File already exists : ' + newFile;
                }
                fs.renameSync(
                    sourceFile,
                    newFile
                )
                break;

            default:
                throw 'Unknown command : ' + command
        }

        tl.setResult(tl.TaskResult.Succeeded, 'Succeeded');
    } catch (err) {
        tl.error(err.message);
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
