// import firbase from "firebase";

// function testjestfunctions(a,b){
//     return a+b;
// };
// module.exports = testjestfunctions;

// function getAuditorDetails(actualRole, userUID){
//     console.log(userUID);
//     firebase.firestore().collection(actualRole).onSnapshot(snapshot => {
//         snapshot.docs.forEach(doc => {
//             localStorage.setItem("auditorID", doc.id);
//             if (doc.id == userUID){
//                 const data = {
//                     email: doc.data().email,
//                     hospital: doc.data().hospital,
//                     name: doc.data().name
//                 };
//                 displayDetails(data.email, data.hospital, data.name);
//             }
//         });
//     }), err => {
//     console.log(err.message);
//     }
// };



// module.exports = getAuditorDetails;