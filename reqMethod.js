methods={}

methods.checkmeth = function (qpath,reqmeth,callback){

    var Metharray=['PUT','POST','GET','DELETE'];
    if(Metharray.indexOf(reqmeth)>-1){
        callback(true);
    }
    else{
        callback(false);
    }

}

module.export=methods;