var downloader=require("./downloader")
var data=[]
size=100
;(async function(){	
	while (true){
		page=Math.ceil(data.length/size)
		var a=await downloader.download("https://house-map.cn/api/v2/houses?city=%E5%8C%97%E4%BA%AC&size="+size+"&page="+page)
		a=JSON.parse(a)
		if (!a.success) break		
		data=data.concat(a.data)
		console.log(a.data.length,data.length)
		require("fs").writeFileSync("a.json",JSON.stringify(data))
	}
	console.log("end")
	
})();
