// const puppeteer = require("puppeteer");
// const { TestScheduler } = require('jest');
// const {generateText, checkAndGenerate} = require('./util');

// test("should output name and age", ()=>{
//     const text =generateText("Max", 29);
//     expect(text).toBe("Max (29 years old)");
//     const text2 =generateText("Anaa", 28);
//     expect(text2).toBe("Anaa (28 years old)");
// });

// test("should output data-less text", ()=>{
//     const text =generateText("", null);
//     expect(text).toBe(" (null years old)");
//     const text2 =generateText();
//     expect(text2).toBe("undefined (undefined years old)");
// });

const functions = require("./util");

test("Adds 2+2 equals 4", ()=>{
    expect(functions.add(2,2)).toBe(4);
});