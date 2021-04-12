// const admin = require("firebase-admin");
const percentage= require("./create_report_end");
// const firebase = require("firebase");
// const test = require('firebase-functions-test')({
//     databaseURL: 'https://{project-name}.firebaseio.com',
//     storageBucket: '{project-name}.appspot.com',
//     projectId: '{project-name}',
// },'./path/to/private-key.json');


test("Calculate the score without any invalid cases", ()=>{
    expect(percentage([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],15)).toEqual([15,15,15]);
});

test("Calculate the score with ALL 0 score", ()=>{
    expect(percentage([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],20)).toEqual([0,15,0]);
});

test("Calculate the score with ALL invalid score", ()=>{
    expect(percentage([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],10)).toEqual([0,0,NaN]);
});

test("Calculate the score with valid and invalid cases", ()=>{
    expect(percentage([1,-1,1,-1,1,-1,1,1,-1,1,1,-1,1,1,1],15)).toEqual([10,10,15]);
});

test("Calculate the score with valid, invalid and 0 score cases", ()=>{
    expect(percentage([1,-1,1,-1,0,-1,0,1,-1,1,0,-1,1,1,1],10)).toEqual([7,10,7]);
});




