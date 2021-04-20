const { generateText } = require('./makeannouncement');

document.getElementById("announcement_title").innerHTML = "This is a test to see whether the title bar field value thing can impose the condition of the maximum text length of the 120 characters overtly long abused can";
document.getElementById("announcement_desc").innerHTML = "Insert 2000+ char string";
document.getElementById("announcement_image").src = "Image Link";

testMaxTitle('Testing the No of Chars for the Title Field', ()=>{
    const textLength = document.getElementById("count_value_title").value;
    expect(len(textLength)).toBeLessThanOrEqual(120); //the number of characters in the textbox must not exceed the maximum allowed chars
});

testMaxDescription('Testing the No of Chars for the Description Field', ()=>{
    const descLength = document.getElementById("count_value").value;
    expect(len(descLength)).toBeLessThanOrEqual(2000); //the number of characters in the textbox must not exceed the maximum allowed chars
});

testImageExtension('Testing the Image Extension uploaded via Upload Image Function',()=>{
    const imageType = document.getElementById("announcement_image").src
    expect(imageType).toBe('.jpg'|'.png'|'.gif'|'.bmp');
}