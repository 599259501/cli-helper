const program = require('commander');

class Command {
    constructor(){
        this.command = "";
        this._alias = "";
        this.description = "";
        this.options = []; // 示例 {flags: "", "description"
    }

    init(){
        let _this = program.command(this.command) // 定义你的 command
            .alias(this._alias) // 缩写
            .description(this.description);
        _this.action(this.process.bind(this));
        _this.on('--help', this.showHelp);
        this.options.forEach(function (option) {
            _this.option(option.flags, option.description);
        });
        program.parse(process.argv);
        console.log("command init");
    }

    showHelp(){}

    process(_program, cmd){}
}

module.exports = Command;