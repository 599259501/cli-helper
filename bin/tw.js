const program = require('commander');
const appInfo = require('../package.json');
const artisan = require('./artisan');

program.version(appInfo.version) ;// 拿到 package.json 你定义的版本

artisan.registerCommands();
artisan.resolveCommand(process.argv[2]);