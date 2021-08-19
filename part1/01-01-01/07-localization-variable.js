var i,str;
function packageDom() {
	for (i = 0; i < 10000; i++) {
		str += i
	}
}

function packageDom() {
	let str
	for (let i = 0; i < 10000; i++) {
		str += i
	}
}