var Comic = require('../models/comic');

var mongoose = require('mongoose');
// connect to mongo function
//solution to "deprecated Promise library" from https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/webcomic');
console.log('connected!');
var comics = [

	new Comic({
		imagePath: 'http://files.explosm.net/comics/Rob/plus-one.png?t=AEFC16',
		title: 'first comic',
		alt: 'first alt text',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nostrum nesciunt, quidem doloremque numquam temporibus ut optio ipsam! Reprehenderit autem impedit dolore eos doloribus sapiente illo, perferendis assumenda reiciendis, et?',
		comicNumber: 1
	}),
	
new Comic({
		imagePath: 'http://files.explosm.net/comics/Kris/sculpture.png?t=AA9089',
		title: 'second comic',
		alt: 'second alt text',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nostrum nesciunt, quidem doloremque numquam temporibus ut optio ipsam! Reprehenderit autem impedit dolore eos doloribus sapiente illo, perferendis assumenda reiciendis, et?',
		comicNumber: 2
	}),
	
	new Comic({
		imagePath: 'http://files.explosm.net/comics/Dave/comicnotagoodtime1.png',
		title: 'third comic',
		alt: 'third alt text',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nostrum nesciunt, quidem doloremque numquam temporibus ut optio ipsam! Reprehenderit autem impedit dolore eos doloribus sapiente illo, perferendis assumenda reiciendis, et?',
		comicNumber: 3
	}),
	
	new Comic({
		imagePath: 'http://files.explosm.net/comics/Matt/Is-my-constant-complaining-about-dubstep-proof-that-Im-getting-old.png',
		title: 'fourth comic',
		alt: 'fourth alt text',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nostrum nesciunt, quidem doloremque numquam temporibus ut optio ipsam! Reprehenderit autem impedit dolore eos doloribus sapiente illo, perferendis assumenda reiciendis, et?',
		comicNumber: 4
	}),
	

];

var done = 0;

for(var i = 0; i < comics.length; i++){
	comics[i].save(function(err, result){
	    console.log(done);
		done++;
		if(done === comics.length){
			mongoose.disconnect();
			console.log('disconnected!')
		}
	});
}