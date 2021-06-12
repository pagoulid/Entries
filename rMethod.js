const Putline=require('readline');
const h = require('crypto');
const line=require('readline');

const rl = Putline.createInterface({// for put old pswd

    input: process.stdin,
    output: process.stdout
});

let old = 'pswd';
let Dir = require('./dirs');
let fs = require('fs');
const max = 9999;
const min = 100;
let Authcheck = false;
// initialization Auth
var Auth ={
    "Header":{
        "Alg":"SHA256",
        "Type":"GWT"


    },
    "Payload":{
        "user":"0",
        "pswd":"0",
        "GroupUser":"0",
        "admin":false
    },
    "Salt":"0"
}


methods={}

methods.checkmeth = function (reqmeth,callback){// query,request method

    var Metharray=['PUT','POST','GET','DELETE'];
    console.log(reqmeth);
    console.log(Metharray.indexOf(reqmeth));
    if(Metharray.indexOf(reqmeth)>-1){
        /*call respective method*/ 
        var rm = _methods[reqmeth.toLowerCase()];
        callback(false,rm);// testing rm
    }
    else{
        callback(true);
    }

}
_methods={}



_methods.get=  function (qpath,resp,resfunc,info){// resp testing
  // in get read first auth to validate  

    Dir.read('./'+qpath['GroupUser']+'/'+qpath['name'],'Auth.json',(err,data)=>{
        if(err){
            console.log(err);// succesful read or NOT!!
        }
        else{
            var Authdata = JSON.parse(data);
            // construct given auth
            /*Given Auth creation */
            Auth["Payload"]["user"]=qpath["username"];
            Auth["Payload"]["pswd"]=qpath["pswd"];
            Auth["Payload"]["GroupUser"]=qpath["GroupUser"];
            if(qpath["GroupUser"]=="admin"){
                Auth["Payload"]["admin"]=true;
            }
            Auth["Salt"]=Authdata["Salt"];// generate random salt between min,max
            /*Given Auth creation */
            var signature = H(Authdata);
            var validate =H(Auth);
            //console.log('Auth entry:    ',signature);
            //console.log('Given Auth :    ',validate);
        }  
        
        


        if(validate==signature){//Authenticate
            console.log('Authentication Completed');
            Readstream('./'+qpath.GroupUser+'/'+qpath.name+'/'+qpath.name+'.json');//change testing
           
            resfunc(info);
 
        }
        else{
            console.log('Authentication Failed!');
            resp.writeHead(500);
            resp.end('Authentication Failed!');

            //return false; // auth failed
        }
    });// function to be coded in dirs
 
}


/**CHANGE TESTING */
function Readstream(Filedir){// this func will be useful in put method
    // in put i retrieve the data , i change the data , then i send back the data to the file
      const readInterface = line.createInterface({
        input: fs.createReadStream(Filedir),
        output: process.stdout,
        console: true
      });
    
      readInterface.on('line', function(line) {
        if(typeof(++line)!=='number'){// Avoid reading NaN lines
          console.log(++line);
    
        }
      });
    }
    /**CHANGE TESTING */

// idea after reading file  red line by line
_methods.put= function (qpath,resp,Timeout,resfunc,info){

    Dir.read('./'+qpath['GroupUser']+'/'+qpath['name'],'Auth.json',(err,data)=>{
        if(err){
            console.log(err);// succesful read or NOT!!
            resp.writeHead(500);
            resp.end();
        }
        else{
            
            let Authdata = JSON.parse(data);

            //create cli read stream to get old pswd user input
            rl.question('Give first old password:',(pswd)=>{
                old = pswd;// password from cli-input
                console.log(old,Authdata["Payload"]["pswd"]);
                if(old===Authdata["Payload"]["pswd"]){
                    Authdata["Payload"]["user"]=qpath["username"];
                    Authdata["Payload"]["pswd"]=qpath["pswd"];
                    Auth["Payload"]["GroupUser"]=qpath["GroupUser"];

                    var pretty = JSON.stringify(qpath,null,4); //changes to write
                    var Authpretty = JSON.stringify(Authdata,null,4); //changes to write
                    //Writestream('./'+qpath.GroupUser+'/'+qpath.name+'/'+qpath.name+'.json',pretty);
                    //Writestream('./'+qpath.GroupUser+'/'+qpath.name+'/'+'Auth.json',Authpretty);
                    Timeout1(Writestream('./'+qpath.GroupUser+'/'+qpath.name+'/'+qpath.name+'.json',pretty),Writestream('./'+qpath.GroupUser+'/'+qpath.name+'/'+'Auth.json',Authpretty),resfunc(info));
                    //update json files then send response
                }
                else{
                    resp.writeHead(500);
                    resp.end('Invalid password');
                    
                }

            });
            /*rl.on('close',()=>{
                console.log('Updated');
            })*/


        }  

    });
}


function Writestream(Filedir,query){// this func will be useful in put method
    // in put i retrieve the data , i change the data , then i send back the data to the file
     
    /**TESTT */
    
    var output = fs.createWriteStream(Filedir);
    output.write(query);
  
  
    }




_methods.post=   function (qpath){// namefile,content is the query
    /*first use testfolder as main directory*/ 
    
    var curr = './';
    var f =  qpath['GroupUser'];
    var c =  '0';
   
    var nxt_curr = './'+ qpath['GroupUser'];
    var nxt_f = qpath['name'];
    var nxt_c =  '0';


    var nxt_nxt_curr = './'+ qpath['GroupUser']+'/'+qpath['name'];
    var nxt_nxt_f = qpath['name']+'.json';
    var nxt_nxt_c =  JSON.stringify(qpath,null,4);
    
/*Auth creation */
    Auth["Payload"]["user"]=qpath["username"];
    Auth["Payload"]["pswd"]=qpath["pswd"];
    Auth["Payload"]["GroupUser"]=qpath["GroupUser"];
    if(qpath["GroupUser"]=="admin"){
        Auth["Payload"]["admin"]=true;
    }
    Auth["Salt"]=Math.random()* (max - min) + min;// generate random salt between min,max
/*Auth creation */
    var token=  JSON.stringify(Auth,null,4);
    Timeout(CFuncsync(curr,f,c),CFuncsync(nxt_curr,nxt_f,nxt_c),ACFuncsync(nxt_nxt_curr,nxt_nxt_f,nxt_nxt_c,token));
    /*Create groupuser folder if not exist,create user folder,create json file*/ 
   
    


}

async function Timeout(func1,func2,func3){// timeout for creation
    await func1;
    await func2;
    await func3;
  }

async function Timeout1(func1,func2,func3){// time out for deletion
    await func1;
    await func2;
    await func3;
    
    
  }
/*hash function*/
function H(json){
    var buff1 = Buffer.from(JSON.stringify(json.Header)).toString('base64');
    var buff2 = Buffer.from(JSON.stringify(json.Payload)).toString('base64');
    //console.log('buff1: ',buff1);
    //console.log('buff2: ',buff2);
    var fbuff = buff1+'.'+buff2;
    //console.log('fbuff2: ',fbuff);
    var salt = JSON.stringify(json.Salt);
    var p=h.createHash('sha256').update(fbuff+salt).digest('base64');
    return p;
}
/*hash function*/
/*synch creation func*/
var CFuncsync = (curr,f,c) =>{
    if(!fs.existsSync(curr+'/'+f)){
        Dir.create(curr,f,c,(msg)=>{


            console.log(msg);
     
    
        });// post coding creation of group folder name folder


    }}


var ACFuncsync = (curr,f,c,token) =>{// creation of files
    
        Dir.create(curr,f,c,(msg)=>{
    
    
                console.log(msg);
                Dir.create(curr,'Auth.json',token,(msg)=>{
                    
                    
                       console.log(msg); 

                })
         
        
            });
    
    
        }
   








_methods.delete=  function (qpath,resp){// namefile,content is the query
  

    nxt_curr = './'+qpath['GroupUser'];
    nxt_f = qpath['name'];





    Dir.read('./'+qpath['GroupUser']+'/'+qpath['name'],'Auth.json',(err,data)=>{
        if(err){
            console.log(err);// succesful read or NOT!!
        }
        else{
            var Authdata = JSON.parse(data);
            // construct given auth
            /*Given Auth creation */
            Auth["Payload"]["user"]=qpath["username"];
            Auth["Payload"]["pswd"]=qpath["pswd"];
            Auth["Payload"]["GroupUser"]=qpath["GroupUser"];
            if(qpath["GroupUser"]=="admin"){
                Auth["Payload"]["admin"]=true;
            }
            Auth["Salt"]=Authdata["Salt"];// generate random salt between min,max
            /*Given Auth creation */
            var signature = H(Authdata);
            var validate =H(Auth);
            //console.log('Auth entry:    ',signature);
            //console.log('Given Auth :    ',validate);
        }  
        
        


        if(validate==signature){//Authenticate
            console.log('Authentication Completed');
            Dir.delete(nxt_curr,nxt_f,(msg)=>{

                    console.log(msg);
                    resp.writeHead(200);
                    resp.end('Deletion Complete');
            
                });
          
        }
        else{
            console.log('Authentication Failed!');
            resp.writeHead(500);
            resp.end('Authentication Failed!');

            //return false; // auth failed
        }
    });// function to be coded in dirs
    
   

}



module.exports=methods;