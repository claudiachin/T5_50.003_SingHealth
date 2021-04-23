package com.example.seleniumtesting.project;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.html5.SessionStorage;
import org.openqa.selenium.html5.WebStorage;
import org.openqa.selenium.remote.Augmenter;

import java.util.List;

public class TenantTest {

    public static void main(String[] args) throws InterruptedException {
        String role;
        String homepath="//*[@id=\"tenannoucements\"]/button";
        String announcementpath="//*[@id=\"tenannoucements\"]/button";
        String directorypath="//*[@id=\"list\"]/button";
        String reportpath="//*[@id=\"tenantreportlist\"]/button";

        System.setProperty("webdriver.gecko.driver", "C:\\Users\\PW Tan\\Downloads\\geckodriver-v0.29.0-win64\\geckodriver.exe");
        WebDriver driver = new FirefoxDriver();
        WebStorage webStorage = (WebStorage) new Augmenter().augment(driver);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        driver.get("https://claudiachin.github.io/T5_50.003_SingHealth");
        Thread.sleep(1000);
        driver.manage().window().maximize();

        WebElement auditorselector =  driver.findElement(By.xpath("//*[@id=\"loginBG\"]/div[1]/div[1]/button[1]"));
        auditorselector.click();
        driver.findElement(By.id("email")).sendKeys("test@mymail.sutd.edu.sg");
        driver.findElement(By.id("pword")).sendKeys("123456789");
        driver.findElement(By.id("clickLogin")).click();
        Thread.sleep(5000);
        System.out.println("Intended to sign in as auditor.");
        Thread.sleep(5000);
        SessionStorage sessionStorage = webStorage.getSessionStorage();
        role= sessionStorage.getItem("role");
        System.out.println("True sign-in role: "+role);
        if(role.equals("auditors")){
            System.out.println("Role is assigned correctly.");
        }
        else{
            System.out.println("Role is not assigned correctly.");
        }

        List<WebElement> linksau = driver.findElements(By.tagName("button"));
        System.out.println("Number of buttons on page: "+linksau.size());


        Thread.sleep(5000);

        WebElement logout= driver.findElement(By.id("logout"));
        logout.click();

        System.out.println("Successful redirection to login page.");
        Thread.sleep(5000);
        WebElement tenantselector =  driver.findElement(By.xpath("/html/body/div[1]/div[1]/button[2]"));
        tenantselector.click();
        driver.findElement(By.id("email")).sendKeys("test@mymail.sutd.edu.sg");
        driver.findElement(By.id("pword")).sendKeys("123456789");
        driver.findElement(By.id("clickLogin")).click();
        Thread.sleep(5000);
        System.out.println("Intended to sign in as tenant.");
        Thread.sleep(5000);

        role= sessionStorage.getItem("role");
        System.out.println("True sign-in role: "+role);
        if(role.equals("tenants")){
            System.out.println("Role is assigned correctly.");
        }
        else{
            System.out.println("Role is not assigned correctly.");
        }

        // get all the links
        List<WebElement> links = driver.findElements(By.tagName("button"));
        System.out.println("Number of buttons on page: "+links.size());

        //Click on announcement cards
        WebElement ann= driver.findElement(By.xpath(announcementpath));
        ann.click();
        Thread.sleep(5000);
        //java.util.List<WebElement> announcements = driver.findElements(By.className("card "));
        List<WebElement> announcements = driver.findElements(By.xpath("//div[contains(@class, 'card')]"));
        //div[contains(@class, 'card')]
        Thread.sleep(5000);
       // while(announcements.size()!=0){
        for(int i=0;i<announcements.size();i++){
            try{
            System.out.println("Clicked on  announcement card.");
            Thread.sleep(5000);
            announcements.get(i).click();
            Thread.sleep(3000);
            driver.findElement(By.xpath("/html/body/div[1]/p/a")).click();
            Thread.sleep(6000);
            for(int k=0;k<i+1;k++){
            js.executeScript("window.scrollBy(0,20)", "");}
           announcements= driver.findElements(By.xpath("//div[contains(@class, 'card')]"));
            Thread.sleep(5000);}
            catch(Exception e){
                System.out.println("stale element");
                break;
            }
        }


            Thread.sleep(5000);


        //Click on directory cards
        WebElement dir= driver.findElement(By.xpath(directorypath));
        dir.click();
        Thread.sleep(5000);
        //java.util.List<WebElement> announcements = driver.findElements(By.className("card "));
        List<WebElement> directories = driver.findElements(By.xpath("//div[contains(@class, 'card')]"));
        Thread.sleep(5000);


        for(int i=0;i<directories.size();i++){
            try{
                Thread.sleep(5000);
                System.out.println("Clicked on  directory card.");
                directories.get(i).click();
                Thread.sleep(3000);
                driver.findElement(By.xpath("/html/body/div[1]/p/a")).click();
                Thread.sleep(6000);
                for(int k=0;k<i+1;k++){
                    js.executeScript("window.scrollBy(0,20)", "");}
                directories= driver.findElements(By.xpath("//div[contains(@class, 'card')]"));
                Thread.sleep(5000);
            }
            catch(Exception e){
                System.out.println("stale element");
                break;
            }
        }
        Thread.sleep(5000);


        //click through report where available
        WebElement report= driver.findElement(By.xpath(reportpath));
        report.click();

        js.executeScript("window.scrollBy(0,2000)", "");
        Thread.sleep(5000);
        List<WebElement> reports = driver.findElements(By.xpath("//div[contains(@class, 'card')]"));
        //div[contains(@class, 'card')]
        Thread.sleep(5000);
        // while(announcements.size()!=0){

            try{
                System.out.println("Accessed report, when there are reports.");
                Thread.sleep(5000);
                reports.get(0).click();
                Thread.sleep(10000);
                js.executeScript("window.scrollBy(0,20)", "");
                driver.findElement(By.xpath("/html/body/div[1]/button[2]")).click();
                Thread.sleep(10000);

                for(int k=0;k<9;k++) {
                    Thread.sleep(10000);
                    js.executeScript("window.scrollBy(0,20)", "");
                    driver.findElement(By.xpath("/html/body/div[1]/button[2]")).click();
                }
                Thread.sleep(5000);
                for(int i=0;i<2;i++){
                js.executeScript("window.scrollBy(0,10000)", "");}
                Thread.sleep(10000);
                driver.findElement(By.xpath("//*[@id=\"finish-button\"]")).click();
                Thread.sleep(3000);

            }
            catch(Exception e){
                System.out.println("stale element");
            }


            driver.close();



    }



}
