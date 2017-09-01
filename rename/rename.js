"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const tl = require("vsts-task-lib/task");
//npm install vsts-task-lib
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get task parameters
            let command = tl.getInput("Command");
            let sourceFile = path.normalize(tl.getPathInput('SourceFile', false, true));
            let newName = tl.getInput("NewName", false);
            console.log('Running command: ' + command);
            switch (command) {
                case "rename":
                    let dir = path.dirname(sourceFile);
                    let newFile = dir + path.sep + newName;
                    console.log('New File name: ' + newFile);
                    if (fs.existsSync(newFile)) {
                        throw 'File already exists : ' + newFile;
                    }
                    fs.renameSync(sourceFile, newFile);
                    break;
                default:
                    throw 'Unknown command : ' + command;
            }
            tl.setResult(tl.TaskResult.Succeeded, 'Succeeded');
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
