
const MakeCommand = require("../make_command");
const path = require("path");
const {APP_DIR} = require("../../bin/app");

class MakeController extends MakeCommand{
    constructor(){
        super();
        this.command = "make:controller";
    }

    getFileDir(){
        return path.resolve(APP_DIR, "./controller");
    }

    getTemplate(makeCls){
        let template = "'use strict';\r\n" +
            "const Controller = require('../common/unit/controller');\r\n" +
            "module.exports = class #class_name# extends Controller {\r\n" +
            "constructor() {\r\n" +
            "   super();\r\n" +
            "}\r\n" +
            "}\r\n";

        return template.replace("#class_name#", makeCls);
    }
}

module.exports = MakeController;