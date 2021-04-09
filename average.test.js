var average = require('./average')

describe("The sum function", function(){

    it("Average of empty array", function(){
        expect(average([])).toStrictEqual([0,0,0,0,0,0,0,0,0,0,0,0])
    })

    test("Average of one dimensional array", function(){
        let array=[];
        array.push([1,2,3,4,5,6,7,8,9,10,11,12]);
        expect(average(array)).toStrictEqual([1,2,3,4,5,6,7,8,9,10,11,12])
    })

    test("Average of one dimensional array with null", function(){
        let array=[];
        array.push([1,2,3,null,5,6,7,8,9,10,11,12]);
        expect(average(array)).toStrictEqual([1,2,3,0,5,6,7,8,9,10,11,12])
    })


    test("Average of two dimensional array with null", function(){
        let array=[];
        array.push([1,2,3,null,5,6,7,8,9,10,11,12]);
        array.push([1,2,3,null,null,6,7,8,9,10,11,12]);
        expect(average(array)).toStrictEqual([1,2,3,0,2.5,6,7,8,9,10,11,12])
    })



    
   

})