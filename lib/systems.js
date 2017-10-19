const fs = require('fs');
const join = require('path').join;
const systemsdir = join(__dirname, '../systems');

let Systems = {};
let active_systems = {};


let load = function(){
	if(!fs.existsSync(systemsdir)){
		fs.mkdirSync(systemsdir);
	}

	let files = fs.readdirSync(systemsdir);
	for(let file of files){
		let [name, extension] = file.split('.');
		if(extension !== 'json'){
			continue;
		}

		active_systems[name] = JSON.parse(fs.readFileSync(join(systemsdir, file)));
	}
}

load();

Systems.get = function(id){
	if(!(id in active_systems)){
		load();
	}

	if(!(id in active_systems)){
		return null;
	}

	return active_systems[id];
};

Systems.new = function(id, data){
	fs.writeFileSync(join(systemsdir, `${id}.json`), JSON.stringify(data));
};

module.exports = Systems;