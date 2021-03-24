

//TO DO 1: individual tenants' monthly average score-> performance of a single tenant
//TO DO 2: average of tenants' monthly average score -> performance of a cluster 
//TO DO 3: individual tenants' specific aspect monthly average score
//TO DO 4: average of individual tenants' specific aspect monthly average score -> overall performance in a particular aspect
//--> wrapper function to retrieve the filter aspects into the function

//TO DO 5: send data for report 
//TO DO 6: retrieve data for report 


//TO DO 7: send data for announcement 
//TO DO 8: retrieve data for announcement 


//TO DO 9: Reply function 

//TO DO 10: Parse json/url and retrieve picture 


const averagescoreinmonth_pertenant= (id)=>{

    var reportsRef = db.collection("reports");
    var averages = [];

    var i;
    for (i = 0; i < 12; i++) { 

    reportsRef.where("tenant", "==", id).where("month","==",i)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            doc.data().overallScore;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}}


