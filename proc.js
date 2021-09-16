//For path processing

host = {};

host.procurl=function (url,callback){
    var patharray =url.split('?'); 
    console.log(patharray.length)
    var hostpath = patharray[0];
    if(hostpath!=='/favicon.ico'){
        
        if(patharray.length===2){
            var querypath = patharray[1];
            querypath =querypath.split('&');
            
            if (querypath.length===4){// check if number and query attributes are correct
                
                n = querypath[0].split('=');// get values of query,need to fix query format
                
                u= querypath[1].split('=');
                
                pswd = querypath[2].split('=');
                
                GRU= querypath[3].split('=');
               
            }
            else{
                return callback('Wrong number of query attributes');
            }

            qkeys=['name','username','pswd','GroupUser'];
            if(qkeys[0]!==n[0] || qkeys[1]!==u[0] ||qkeys[2]!==pswd[0] || qkeys[3]!==GRU[0]){
               
                return callback('More than 1 query attributes are wrong.Check again for registration');
            }

             var q = {
                'name':n[1],
                'username':u[1],
                'pswd':pswd[1],
                'GroupUser':GRU[1]
            } // if all done save the query for further processing

            //querypath=JSON.stringify(q);
            
            callback(false,hostpath,q);
        }


        else if(patharray.length<2){
            callback('No query has been defined');
        }
        else{
            callback('Invalid query syntax'); 
        }
        }


       
   
  }


module.exports=host;