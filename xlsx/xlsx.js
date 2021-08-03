var http = require('http')
var xlsx = require('xlsx')

var server = http.createServer(function(require, response) {
	console.log('server success')
	res.writeHead(200,
        {
        'Content-Type': 'application/json;charset=utf-8',
         'Access-Control-Allow-Credentials': true,
         'Access-Control-Allow-Origin': 'localhost:8008',
         'Access-Control-Allow-Methods': 'PUT,POST,GET,OPTIONS',
     })
	const data = [{
		'姓名': 'panhe',
		'年龄': 18
	}]
	const sheet = xlsx.utils.json_to_sheet(data); // 通过工具将json转表对象
	console.log('sheet: ', sheet);
	const workbook = {
		SheetNames: ['test'],
		Sheets: {
			'test': {...sheet}
		}
	}
	const r = xlsx.write(workbook, { type: 'buffer' })
	console.log('res....', r)
	// response.end('hello word')
	response.end(r)
})

server.listen(8008)