/*document.getElementById("announcement_title").innerHTML = "This is a test to see whether the title bar field value thing can impose the condition of the maximum text length of the 120 characters overtly long abused can";
document.getElementById("announcement_desc").innerHTML = "Insert 2000+ char string";
document.getElementById("announcement_image").src = "Image Link";*/
//testMaxTitle
test('Testing the Max No of Chars for the Title Field', ()=>{
    expect(limitBoundaryTitle("nsrkblzvamujpoiwbudujpwjrihwoxhdgmiurjlzizuvnghldlzuvfytwjwnrasjsrffqkxfwamnyriyibqburtcplbsysbiwwccprgmoiimfjdyqgtoxpwwcbjiplzbgi")).toBeLessThanOrEqual(120); //the number of characters in the textbox must not exceed the maximum allowed chars
});

//testMaxDescription
test('Testing the Max No of Chars for the Description Field', ()=>{
    expect(limitBoundaryDescription("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")).toBeLessThanOrEqual(2000); //the number of characters in the textbox must not exceed the maximum allowed chars
});

//testMinTitle
test('Testing the Min No of Chars for the Title Field', ()=>{
    expect(limitBoundaryTitle("")).toBeGreaterThanOrEqual(0);
});

//testMinDescription
test('Testing the Min No of Chars for the Description Field', ()=>{
    expect(limitBoundaryDescription("")).toBeGreaterThanOrEqual(0);
});

//testImageExtension
test('Testing the Image Extension uploaded via Upload Image Function',()=>{
    expect(limitImageType("gif")).toBe("valid");
});

test('Testing the Image Extension uploaded via Upload Image Function',()=>{
    expect(limitImageType("tga")).toBe("invalid");
});


function limitBoundaryTitle (stringTest){
    inputnum = stringTest.length;
    if (inputnum >= 120){
        inputnum = 120;}
    else if(inputnum <= 0){
        inputnum = 0;
    }
    return inputnum;
}

function limitBoundaryDescription(stringDesc){
    inputnum = stringDesc.length;
    if (inputnum >= 2000){
        inputnum = 2000;}
    else if(inputnum <= 0){
        inputnum = 0;
    }
    return inputnum;
}

function limitImageType(stringImage){
    if(stringImage=="jpg" || stringImage=="gif" || stringImage=="png"){
        extension = "valid";
    }
    else{
        extension = "invalid";
    }
    return extension;
}