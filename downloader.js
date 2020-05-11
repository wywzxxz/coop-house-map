exports.download=function(url){return new Promise(async (resolve, reject) => {
	require("https").get(url,{timeout:120000}).on('response', function (response) {
		var body = '';				
		response.on('data', function (chunk) {			
			body += chunk;
		});
		response.on('end', function () {
			return resolve(body)
		})
		response.on('error', (e) => {
			console.error(e);
			return reject(e)
		});
	}).on('error', (e) => {
			console.error(e);
			return reject(e)
		});
})}
const client = require('axios').create({httpsAgent:new require('socks-proxy-agent')('socks5://127.0.0.1:1080')});
exports.downloadSocks=function (url){return new Promise(async (resolve, reject) => {	
	try{
		res=await client.get(url)
		return resolve(res.data)
	}catch(e)
	{
		return reject(e)
	}
})}


exports.get=function(url){return new Promise(async (resolve, reject) => {
	try{
		return resolve(await exports.downloadSocks(url)) 
	}catch(e){console.error(e,"retry")}
	a=await resolve((""+await  exports.download(url)))
	try
	{
		return resolve(JSON.parse(a))
	}catch(e){}
	return resolve(a)

})}