
const Command = require("./command");
const fs = require("fs");
const util = require("../util");
const program = require('commander');
const path = require("path");

class MakeCommand extends Command{
    constructor(){
        super();
        this.options = [
            {flags: "--path [path]", description: "文件路径"}
        ];
    }

    makeDir(dirname){
        if (fs.existsSync(dirname)) {
            return true;
        }

        fs.mkdirSync(dirname);
        return true;
    }

    process(_program, cmd) {
        this._program = _program;
        let dirname = this.getFileDir();
        this.makeDir(dirname);
        this.createTemplate(dirname);
    }


    getFileDir(){
        return "";
    }

    createTemplate(dirname){
        // 创建文件名
        let makeCls = this._program.path;
        if (!makeCls) {
            console.error("path 参数不能为空");
            return;
        }
        let fileName = this.getFileName(makeCls);
        let force = this._program.force || false;
        if (fs.existsSync(fileName) && !force) {
            console.error("文件已经存在，无法再创建，如果需要强制写入，请使用--force参数", fileName);
            throw {
                msg: "文件已经存在，无法再创建，如果需要强制写入，请使用--force参数"
            };
        }

        let template = this.getTemplate(makeCls, {
            fileName
        });
        return fs.writeFileSync(path.resolve(dirname, fileName), template);
    }

    getFileName(makeCls){
        let fileName = util.toLine(makeCls)+".js";
        fileName = fileName[0] === "_" ? fileName.substr(1) : fileName;
        return fileName;
    }

    getTemplate(makeCls){
        return "";
    }
}

module.exports = MakeCommand;