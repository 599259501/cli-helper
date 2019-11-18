
const Command = require('../command');
const {APP_DIR} = require('../../bin/app');
const path = require("path");
const fs = require("fs");
const { execSync } = require('child_process');

class CreateProject extends Command{
    constructor(){
        super();
        this.command = "create_project";
        this.options = [
            {
                flags: "--project_name [project_name]",
                description: "项目名"
            }
        ];
    }

    process(_program, cmd) {
        this._program = _program;
        // 校验参数
        if (!this.checkParams()) {
            return;
        }
        // todo 是否可以创建项目
        if (this.hasSameProject()) {
            console.error("相同的项目名已经存在，请替换项目名称");
            return;
        }
        // todo 创建项目
        try{
            execSync(`sh ../../script/create.sh ${this._program.project_name}`);
        }catch (e) {
            console.error("创建项目过程中出现了异常", e);
            return;
        }

        console.info("项目初始化成功");
    }

    hasSameProject(){
        let projectDir = path.resolve(APP_DIR, this._program.project_name);
        if (fs.existsSync(projectDir)) {
            return true;
        }

        return false;
    }

    checkParams(){
        return true;
    }
}

module.exports = CreateProject;