package seleniumTesting;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class Tenant {

	public void Login(FirefoxDriver driver) throws Exception {
		driver.get("https://claudiachin.github.io/T5_50.003_SingHealth");
		Thread.sleep(1000);

		driver.findElement(By.id("email")).sendKeys("test@mymail.sutd.edu.sg");
		driver.findElement(By.id("pword")).sendKeys("123456789");
		driver.findElement(By.id("clickLogin")).click();
		Thread.sleep(5000);
	}
	
	public boolean CreateTenant() throws Exception {
		System.setProperty("webdriver.gecko.driver", "C:\\WebDriver\\bin\\geckodriver.exe");
		FirefoxDriver driver = new FirefoxDriver();

		Login(driver);

		driver.get("https://claudiachin.github.io/T5_50.003_SingHealth/src/html/directory.html");
		Thread.sleep(5000);
		
		driver.findElement(By.id("makenewtenant")).click();
		Thread.sleep(2000);
		
		new Select(driver.findElement(By.id("hospital"))).selectByVisibleText("Academia");
		driver.findElement(By.id("branch")).sendKeys("AAA"); 
		driver.findElement(By.id("location")).sendKeys("B1-04"); 
		new Select(driver.findElement(By.id("newtype"))).selectByVisibleText("Non-F&B");
		driver.findElement(By.id("name")).sendKeys("Claudia Chin"); 
		driver.findElement(By.id("email")).sendKeys("claudia.chinsh@gmail.com"); 
		driver.findElement(By.id("expiry")).sendKeys("2021-09-25"); 
		
		driver.findElement(By.id("addtenant")).click(); 
		Thread.sleep(5000);
		
		// goes back to directory.html
		List<WebElement> sects = driver.findElements(By.className("sect"));
		for (int i=0; i<sects.size(); i++) {
			if (sects.get(i).getText().contains("Academia - AAA")) {
				System.out.println("test passed!");
				Thread.sleep(5000);
				driver.close();
				return true;
			}
		}
		
		System.out.println("tenant not found");
		driver.close();
		return false;
	}
	
	@Test
	public void CreateTenantTest() throws Exception {
		assertEquals(true, CreateTenant());
	}
	
	public boolean ViewTenant() throws Exception {
		System.setProperty("webdriver.gecko.driver", "C:\\WebDriver\\bin\\geckodriver.exe");
		FirefoxDriver driver = new FirefoxDriver();

		Login(driver);

		driver.get("https://claudiachin.github.io/T5_50.003_SingHealth/src/html/directory.html");
		Thread.sleep(5000);
		
		List<WebElement> sects = driver.findElements(By.className("sect"));
		for (int i=0; i<sects.size(); i++) {
			if (sects.get(i).getText().contains("Academia - AAA")) {
				sects.get(i).click();
				
				System.out.println("test passed!");
				Thread.sleep(5000);
				driver.close();
				return true;
			}
		}
		
		System.out.println("tenant not found");
		driver.close();
		return false;
		
	}
	
	@Test
	public void ViewTenantTest() throws Exception {
		assertEquals(true, ViewTenant());
	}
	
}
