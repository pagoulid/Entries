//For path processing

host = {};

host.urlproc=function (url,callback){
    var patharray =url.split('?'); 
    var hostpath = patharray[0];
    if(hostpath!=='/favicon.ico'){
        if(length(patharray)===2){}
            var querypath = patharray[1].replace(/&/g,',');
            querypath=JSON.stringify(querypath);
            callback(false,hostpath,querypath);
        }
        else if(length(patharray)<2){
            callback(false,hostpath,'undefined');
        }
        else{
            callback('Invalid query syntax');
        }

  }


module.expoorts=host;