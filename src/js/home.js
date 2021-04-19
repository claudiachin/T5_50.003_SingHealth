
    const trend = document.querySelector("#trends");
    const report = document.querySelector("#new-report");
    const list = document.querySelector("#tenantreportlist");
    const tendirectory=document.querySelector("#directorybutton");
    //const auditornav = document.querySelector("#navbarauditors");
    
    
    var Boo = function(){
        window.location.href='directory_tenant.html';
    }
    
    
    
    if(sessionStorage.getItem("role")==="tenants"){
    trend.style.display="none";
    report.style.display="none";
    list.style.display="block";
    tendirectory.setAttribute( "onClick", "javascript: Boo();" );
    //tendirectory.onclick="window.location.href='directory_tenant.html';";
    }
