var GEOAPIS_V1=GEOAPIS_V1||{};GEOAPIS_V1.baseService=function(a){this.accessToken="Bearer "+a;this.apiAddress="https://api.pitneybowes.com/location-intelligence";this.response={}};GEOAPIS_V1.baseService.prototype.callApi=function(c){var a=null;this.response={};this.response.httpResponse={};try{a=$.ajax({url:this.apiAddress+c,type:"GET",async:false,headers:{"Content-type":"application/json",Accept:"application/json",Authorization:this.accessToken}});this.response.response=JSON.parse(a.responseText);if(a.status===200){this.response.status="success"}else{this.response.status="failed"}}catch(b){this.response.status="failed";if(a.responseText!==""){this.response.response=a.responseText}else{this.response.response={};this.response.response.errors=[];this.response.response.errors.push({errorCode:"GE0001",errorDescription:"Internal server error encountered."})}}this.response.httpResponse.status=a.status;this.response.httpResponse.statusText=a.statusText};GEOAPIS_V1.baseService.prototype.callApiAsync=function(a,b){$.ajax({url:this.apiAddress+a,type:"GET",async:true,headers:{"Content-type":"application/json",Accept:"application/json",Authorization:this.accessToken}}).done(function(d,c,f){this.response={};this.response.httpResponse={};this.response.httpResponse.status=f.status;this.response.httpResponse.statusText=f.statusText;this.response.response=JSON.parse(f.responseText);if(f.status===200){this.response.status="success"}else{this.response.status="failed"}if(b!==undefined&&b!==null){var e=b;e(this.response)}else{alert("Callback are not available.")}}).fail(function(f,c,e){this.response={};this.response.status="failed";this.response.httpResponse={};this.response.httpResponse.status=f.status;this.response.httpResponse.statusText=f.statusText;if(f.responseText!==""){this.response.response=f.responseText}else{this.response.response={};this.response.response.errors=[];this.response.response.errors.push({errorCode:"GE0001",errorDescription:"Internal server error encountered."})}if(b!==undefined&&b!==null){var d=b;d(this.response)}else{alert("Callback are not available.")}})};GEOAPIS_V1.baseService.prototype.callPostApi=function(d,a){var b=null;this.response={};this.response.httpResponse={};try{b=$.ajax({url:this.apiAddress+d,type:"POST",data:a,async:false,headers:{"Content-type":"application/json",Accept:"application/json",Authorization:this.accessToken}});this.response.response=JSON.parse(b.responseText);if(b.status===200){this.response.status="success"}else{this.response.status="failed"}}catch(c){this.response.status="failed";if(b.responseText!==""){this.response.response=b.responseText}else{this.response.response={};this.response.response.errors=[];this.response.response.errors.push({errorCode:"GE0001",errorDescription:"Internal server error encountered."})}}this.response.httpResponse.status=b.status;this.response.httpResponse.statusText=b.statusText};GEOAPIS_V1.baseService.prototype.callPostApiAsync=function(b,a,c){$.ajax({url:this.apiAddress+b,type:"POST",data:a,async:true,headers:{"Content-type":"application/json",Accept:"application/json",Authorization:this.accessToken}}).done(function(e,d,g){this.response={};this.response.httpResponse={};this.response.httpResponse.status=g.status;this.response.httpResponse.statusText=g.statusText;this.response.response=JSON.parse(g.responseText);if(g.status===200){this.response.status="success"}else{this.response.status="failed"}if(c!==undefined&&c!==null){var f=c;f(this.response)}else{alert("Callback are not available.")}}).fail(function(g,d,f){this.response={};this.response.status="failed";this.response.httpResponse={};this.response.httpResponse.status=g.status;this.response.httpResponse.statusText=g.statusText;if(g.responseText!==""){this.response.response=g.responseText}else{this.response.response={};this.response.response.errors=[];this.response.response.errors.push({errorCode:"GE0001",errorDescription:"Internal server error encountered."})}if(c!==undefined&&c!==null){var e=c;e(this.response)}else{alert("Callback are not available.")}})};GEOAPIS_V1.baseService.prototype.apiGetUrl=function(d,b,c){for(var a in d){if(b.indexOf(a)>=0){if(d[a]!==null&&d[a]!==undefined){c+=this.queryDelimiter(c)+a+"="+encodeURIComponent(d[a])}}}return c};GEOAPIS_V1.baseService.prototype.queryDelimiter=function(b){var a="&";if(b.search("\\?")<0){a="?"}return a};function GEOAPIS_V1_INHERIT(c,a){var b=new c();a.prototype=b;a.prototype.constructor=a}GEOAPIS_V1.geoMap=function(a){GEOAPIS_V1.baseService.call(this,"");this.apiKey=a};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoMap);GEOAPIS_V1.geoMap.prototype.getGeoMap=function(b,a){$("#"+a).html("");$("<div></div>",{id:"geoAPI-geoMap-raster"}).appendTo("#"+a);$("<div></div>",{id:"geoAPI-geoMap-raster-logo"}).appendTo("#"+a);$("#geoAPI-geoMap-raster").css("position","absolute");$("#geoAPI-geoMap-raster").css("width","100%");$("#geoAPI-geoMap-raster").css("height","100%");$("<img/>",{src:"https://locate.pitneybowes.com/images/pitneyboweslogo.png"}).appendTo("#geoAPI-geoMap-raster-logo");$("#geoAPI-geoMap-raster-logo").css("position","absolute");$("#geoAPI-geoMap-raster-logo").css("bottom","0px");$("#geoAPI-geoMap-raster-logo").css("z-index","4");var c=L.map("geoAPI-geoMap-raster");c.setView([b.latitude,b.longitude],b.zoom);return c};GEOAPIS_V1.geoMap.prototype.getGeoMapRaster=function(a,b){var d="bronze",c,e;if(b=="bronze"||b=="iron"||b=="steel"){d=b}c=this.apiAddress+"/geomap/v1/tile/osm/{z}/{x}/{y}.png?api_key="+this.apiKey+"&theme="+d;e=L.tileLayer(c,{attribution:'<a target="_blank" href="http://www.openstreetmap.org/copyright">&copy; OpenStreetMap contributors</a>'}).addTo(a);return a};GEOAPIS_V1.geoMap.prototype.getGeoMapVector=function(a,b){var c="bronze",d;if(b=="bronze"||b=="iron"||b=="steel"){c=b}d=Tangram.leafletLayer({scene:"resources/"+c+".yaml",attribution:'<a target="_blank" href="http://www.openstreetmap.org/copyright">&copy; OpenStreetMap contributors</a>',introspection:true}).addTo(a);return a};