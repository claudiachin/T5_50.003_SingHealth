const { titleFieldLength } = require('./makeannouncement');
const { descFieldLength } = require('./makeannouncement');
const { imageType } = require('./makeannouncement');

/*document.getElementById("announcement_title").innerHTML = "This is a test to see whether the title bar field value thing can impose the condition of the maximum text length of the 120 characters overtly long abused can";
document.getElementById("announcement_desc").innerHTML = "Insert 2000+ char string";
document.getElementById("announcement_image").src = "Image Link";*/

testMaxTitle('Testing the Max No of Chars for the Title Field', ()=>{
    const textLength = titleFieldLength(); //utilize the titleFieldLength function to return no of chars
    expect(textLength).toBeLessThanOrEqual(120); //the number of characters in the textbox must not exceed the maximum allowed chars
});

testMaxDescription('Testing the Max No of Chars for the Description Field', ()=>{
    const descLength = descFieldLength();
    expect(descLength).toBeLessThanOrEqual(2000); //the number of characters in the textbox must not exceed the maximum allowed chars
});

testMinTitle('Testing the Min No of Chars for the Title Field', ()=>{
    const textLength = titleFieldLength();
    expect(textLength).toBeGreaterThanOrEqual(0);
});

testMinDescription('Testing the Min No of Chars for the Description Field', ()=>{
    const descLength = descFieldLength();
    expect(descLength).toBeGreaterThanOrEqual(0);
});

testImageExtension('Testing the Image Extension uploaded via Upload Image Function',()=>{
    const imageType = imageType();
    expect(imageType).toBe('jpg'|'png'|'gif'|'bmp');
});

