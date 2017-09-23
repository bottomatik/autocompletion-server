let autocomplete = {};

autocomplete.get = function(text, data, size=5){
	let words = text.split(' ');
	let word_reg = words.reduce((prev, actual) => {
		return prev+ `(${actual})|`;
	}, '').slice(0, -1);
	word_reg = new RegExp(word_reg, 'g');

	let messages = [];

	for(let message of data){
		let match = message.match(word_reg);
		messages.push({
			message: message,
			matches: match ? match.length : 0,
		});
	}

	messages.sort(function(a, b){
		return b.matches - a.matches;
	});

	return messages.slice(0, size).filter(e=>{return e.matches > 0}).map(e=>{return e.message;});
};

module.exports = autocomplete;