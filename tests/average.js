function average(array) {
    let a = new Array(12); 
    if (array.length==0){    
        for (let i=0; i<12; ++i) {a[i] = 0;}
        return a;
    }

   
    for(i=0;i<12;i++){
        var ans=0;
       for(j=0;j<array.length;j++){

        if(typeof array[j][i]=== 'undefined'){
            ans+=0;    
        }
           ans+=array[j][i];
       }
       
       a[i]=ans/array.length;
    }

    
    return a;
}




module.exports = average;