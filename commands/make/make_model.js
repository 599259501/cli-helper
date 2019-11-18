
const MakeCommand = require("../make_command");

class MakeModel extends MakeCommand{
    constructor(){
        super();
        this.command = "make:model";
    }

    getFileDir(){
        return path.resolve(APP_DIR, "./model");
    }

    getTemplate(makeCls, options = {}){
        let template = "'use strict';\r\n" +
            "const Model = require(\"../common/unit/model\");\r\n" +
            "module.exports = class #class_name# extends Model{\r\n" +
            "constructor() {\r\n" +
            "   super();\r\n" +
            "   this.tableName = \"#table_name#\";\r\n"+
            "   this.softDelete = #soft_delete#;\r\n"+
            "}\r\n" +
            "}\r\n";

        let tableName = util.object_get(this.input, "table_name", path.basename(options.fileName, '.js'));
        let softDelete = util.object_get(this.input, "soft_delete", true);
        return template.replace("#class_name#", makeCls)
            .replace("#table_name#", tableName)
            .replace("#soft_delete#", softDelete);
    }
}

module.exports = MakeModel;