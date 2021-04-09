var sum = require('./sum')

describe("The sum function", function(){

    it("Sum of empty array", function(){
        expect(sum([])).toBe(0)
    })

    test('Sum of a filled array', function() {
        expect(sum([1,2,3,4])).toBe(2.5)
    })

})