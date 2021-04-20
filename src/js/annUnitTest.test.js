const { generateText } = require('./makeannouncement');

testMaxTitle('Testing the No of Chars for the Title Field', ()=>{
    const text = "aaas";
    expect(len(text)).toBeLessThanOrEqual(120); //the number of characters in the textbox must not exceed the maximum allowed chars
});

testMaxDescription('Testing the No of Chars for the Title Field', ()=>{
    const text = "aaas";
    expect(len(text)).toBeLessThanOrEqual(2000); //the number of characters in the textbox must not exceed the maximum allowed chars
});