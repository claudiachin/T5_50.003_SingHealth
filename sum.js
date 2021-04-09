function sum(array) {
    if (array.length==0){return 0;}
    var ans=0;
    for(i=0;i<array.length;i++){
        ans+=array[i];
        
    }
    
    return ans/array.length;
}




module.exports = sum;