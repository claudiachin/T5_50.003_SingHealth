// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBl1hU_vW6IbzkF0XTqvnBlWyLrTmgybns",
    authDomain: "singhealth-221e6.firebaseapp.com",
    projectId: "singhealth-221e6",
    appId: "1:684333425325:web:59bbff097942477f599c24",
    measurementId: "G-SYJWNBX65P",
    storageBucket: "gs://singhealth-221e6.appspot.com/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();

db.settings({ timestampsInSnapshots: true });

type = localStorage.getItem("type");
reportID = localStorage.getItem("reportID");

console.log(type);

db.collection("reports").doc(reportID).get().then((doc) => {
    if (doc.exists) {
        if (type == "F&B") {
            professionalism = doc.data().professionalism_staff_hygiene_scores;
            info1 = percentage(professionalism, 10);
            console.log(info1);
            document.getElementById("professionalism").innerHTML = info1[0] + "/" + info1[1] + " - " + info1[2] + "%";

            general_cleanliness = doc.data().housekeeping_general_cleanliness_scores;
            info2 = percentage(general_cleanliness, 20);
            document.getElementById("general_cleanliness").innerHTML = info2[0] + "/" + info2[1] + " - " + info2[2] + "%";

            food_hygiene = doc.data().food_hygiene_scores;
            info3 = percentage(food_hygiene, 35);
            document.getElementById("food_hygiene").innerHTML = info3[0] + "/" + info3[1] + " - " + info3[2] + "%";

            healther_choice = doc.data().healthier_choice_scores;
            info4 = percentage(healther_choice, 15);
            document.getElementById("healther_choice").innerHTML = info4[0] + "/" + info4[1] + " - " + info4[2] + "%";

            workplace_safety = doc.data().workplace_safety_health_scores;
            info5 = percentage(workplace_safety, 20);
            document.getElementById("workplace_safety").innerHTML = info5[0] + "/" + info5[1] + " - " + info5[2] + "%";

            covid = doc.data().covid_scores;
            info6 = percentage(covid, 0);
            document.getElementById("covid").innerHTML = info6[0] + "/" + info6[1];

            overall = info1[2] + info2[2] + info3[2] + info4[2] + info5[2] + info6[2];
            document.getElementById("overall").innerHTML = overall + "%";

        } else if (type == "Non-F&B") {
            professionalism = doc.data().professionalism_staff_hygiene_scores;
            info1 = percentage(professionalism, 20);
            document.getElementById("professionalism").innerHTML = info1[0] + "/" + info1[1] + " - " + info1[2] + "%";

            general_cleanliness = doc.data().housekeeping_general_cleanliness_scores;
            info2 = percentage(general_cleanliness, 40);
            document.getElementById("general_cleanliness").innerHTML = info2[0] + "/" + info2[1] + " - " + info2[2] + "%";

            workplace_safety = doc.data().workplace_safety_health_scores;
            info3 = percentage(workplace_safety, 40);
            document.getElementById("workplace_safety").innerHTML = info3[0] + "/" + info3[1] + " - " + info3[2] + "%";

            covid = doc.data().covid_scores;
            info4 = percentage(covid, 0);
            document.getElementById("covid").innerHTML = info4[0] + "/" + info4[1];

            overall = info1[2] + info2[2] + info3[2] + info4[2];
            document.getElementById("overall").innerHTML = overall + "%";
        }

        db.collection("reports").doc(reportID).set({
            overallScore: overall,
        }, {
            merge: true,
        })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

        db.collection("tenants").doc(localStorage.getItem("tenantID")).update({
            reports: firebase.firestore.FieldValue.arrayUnion(db.collection("reports").doc(reportID)),
        })

    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

// function percentage(data, weight) {
//     var score = 0;
//     var outOf = data.length;

//     for (i = 0; i < data.length; i++) {
//         if (data[i] == -1) { //invalid
//             outOf -= 1;
//         } else if (data[i] == 1) { //yes
//             score += 1;
//         }
//     }

//     result = Number.parseFloat((score / outOf * weight).toFixed(1));
//     return [score, outOf, result];
// }

// module.exports = percentage;