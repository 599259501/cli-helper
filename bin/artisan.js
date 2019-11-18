const globby = require('globby');
const Command = require('../commands/command');

class Artisan {
    constructor(){
        this._commands = [];
    }

    registerCommands(){
        let commands = globby.sync(["../commands/*.js", "../commands/**/*.js", "!../commands/command.js", "!../commands/make_command.js"],
            {cwd: __dirname});
        let _this = this;
        commands.forEach(function (command) {
            let commandCls = require(command);
            let commandObj = new commandCls();
            if (!(commandObj instanceof Command)){
                return;
            }
            if (_this._commands[commandObj.command]){
                console.error(`${commandObj.command} 已经存在，请勿重复定义`);
                throw new Error(`${commandObj.command} 已经存在，请勿重复定义`);
            }

            _this._commands[commandObj.command] = commandObj;
        });
    }

    resolveCommand(command, options){
        if (!this._commands[command]) {
            console.error(command+"命令暂不支持");
            throw new Error(`command命令暂不支持`);
        }
        this._commands[command].init();
        return this._commands[command];
    }
}

module.exports = new Artisan();