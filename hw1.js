// want  folders of users,checks,tokens
var pathprocess=require('./proc');// url path processing
var dir = require('./dirs');
let rmeth = require('./rMethod');// check req method
const line=require('readline');
const fs = require('fs');



let MESSAGE ={

  '/hello':'Welcome dear User',
  '/morning':'Good Morning User',
  '/sunny' :'Beautiful day to log in today'
};

var port = 3001;

var srv=require('http').createServer((req,res)=>{
    pathprocess.procurl(req.url,(err,hostpath,querypath)=>{
     
    /***************************************************************** */
    if(err){
      console.log(err);
      res.writeHead(500);
      res.end();
    }
    else{
      
      //console.log(["name","username","pswd","GroupUser"].indexOf(querypath));
      ReadPath(hostpath,res,(info)=>{// info has resp(status) msg due to given path,err if true
        
        if(info['error']){
          info['response'].writeHead(406);
          console.log('Something went wrong');
        }
        else{
          
          if(typeof(info['msg'])!== 'undefined'){
            /*Check method of request then act respectively for query*/
            rmeth.checkmeth(req.method,(err,rm)=>{
              if(err){
                console.log('Something went wrong in method');
              }
              else{
                if(req.method=='POST'){// if post write entry and sent response
                var check = checkpath(querypath); 
                if(!check){
                  DelPostTimeout(rm(querypath),resTimeout(info));

                }
                else{
                  console.log('User already exist');
                  info['response'].writeHead(500);
                  info['response'].end('User already exist');
                  //resTimeout(info);
                }
                //DelPostTimeout(rm(querypath),resTimeout(info));
                }
                else if(req.method=='GET'){// if get read entry ,read data line by line,sent res
                  var check = checkpath(querypath);
                  if(check){
                    rm(querypath,res,resTimeout,info);//Check for auth
                    //If auth valid then read file and send info response with restimeout
                    //else dont read and send 500 status response
                    //GetPutTimeout(rm(querypath),Readstream('./'+querypath.GroupUser+'/'+querypath.name+'/'+querypath.name+'.json'),resTimeout(info));
                  }
                  else{
                    console.log('Entry does not exist');
                    info['response'].writeHead(404);
                    info['response'].end('Entry does not exist');
                    

                  }
                  //GetPutTimeout(rm(querypath),Readstream('./'+querypath.GroupUser+'/'+querypath.name+'/'+querypath.name+'.json'),resTimeout(info));
                }
                else if(req.method=='PUT'){// if get read entry ,read data line by line,sent res
                  var check = checkpath(querypath);
                  if(check){
                    var pretty = JSON.stringify(querypath,null,4); //changes to write
                    //GetPutTimeout(rm(querypath),Writestream('./'+querypath.GroupUser+'/'+querypath.name+'/'+querypath.name+'.json',pretty),resTimeout(info));
                    rm(querypath,res,GetPutTimeout,resTimeout,info);//need timeout to write data files before response
                  }
                  else{
                    console.log('Entry does not exist');
                    info['response'].writeHead(404);
                    info['response'].end('Entry does not exist');
                    //resTimeout(info);

                  }
                  //var pretty = JSON.stringify(querypath,null,4); //changes to write
                  //GetPutTimeout(rm(querypath),Writestream('./'+querypath.GroupUser+'/'+querypath.name+'/'+querypath.name+'.json',pretty),resTimeout(info));
                }
                else if(req.method=='DELETE'){
                  var check = checkpath(querypath);
                  if(check){
                    //DelPostTimeout(rm(querypath),resTimeout(info));
                    rm(querypath,res);

                  }
                  else{
                    console.log('Entry does not exist');
                    info['response'].writeHead(404);
                    info['response'].end('Entry does not exist');
                    //resTimeout(info);

                  }
                  //DelPostTimeout(rm(querypath),resTimeout(info));

                }
               
              }
            });
            /*Check method of request then act respectively for query*/ 
          }
          else{
            info['response'].writeHead(200);
            res.end('\n Hello World !!!');
          }
          
        }
      });
      
    }
  });
});


// check if path exists
checkpath = function(path){
  var dest = './'+path['GroupUser']+'/'+path['name'];
  if(fs.existsSync(dest)){
      return true;
  }
  else{
      return false;
  }

}
// set timeout func for waiting to send response,send response after reading writing entry
function resTimeout(ReadPathInfo){
  console.log('Success!!!');
  json_msg = JSON.stringify(ReadPathInfo['msg']);
  
  ReadPathInfo['response'].writeHead(200,{'Content-Type':'application/json'});
  ReadPathInfo['response'].write(json_msg);
  ReadPathInfo['response'].end('\n Hello World !!!');

}







function Writestream(Filedir,query){// this func will be useful in put method
  // in put i retrieve the data , i change the data , then i send back the data to the file
   
  /**TESTT */
  
  var output = fs.createWriteStream(Filedir);
  output.write(query);


  }






async function GetPutTimeout(func1,func2,func3){
  await func1;// for authentication
  await func2;
  func3;
}

// experiment with get auth CP
async function GetTimeout(func1,func3){
   await func1;// for authentication
  
  func3;
}




async function DelPostTimeout(func1,func2){
  await func1;//(path,(msg)=>{console.log(msg)});
  func2;
}

// Read path and return respective msg due to the path
function ReadPath(path,response,callback){
  var info={};
  if (typeof(MESSAGE[path])!=='undefined'){
     
            info['msg'] = MESSAGE[path];
            info['error']=false;
            info['response']=response;
            return callback(info);

  }
  else if (path === '/favicon.ico'){
   
      info['error']=false;
      info['response']=response;
      return callback(info);
     
  }
   
  console.log('Invalid Path');   
  info['error']=true;     
  info['response']=response;     
  callback(info);
 
}

srv.listen(port);