
const MakeCommand = require("../make_command");

class MakeLogic extends MakeCommand{
    constructor(){
        super();
        this.command = "make:logic";
    }

    getFileDir(){
        return path.resolve(APP_DIR, "./logics");
    }

    getTemplate(makeCls, options = {}){
        let template = "'use strict';\r\n"+
            "const Logic = require('./base_logic');\r\n"+
            "class #class_name# extends Logic {\r\n"+
            "}\r\n";
        return template.replace("#class_name#", makeCls);
    }
}

module.exports = MakeLogic;