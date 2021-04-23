package seleniumTesting;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class ViewReport {

	public void Login(FirefoxDriver driver) throws Exception {
		driver.get("https://claudiachin.github.io/T5_50.003_SingHealth");
		Thread.sleep(1000);

		driver.findElement(By.id("email")).sendKeys("test@mymail.sutd.edu.sg");
		driver.findElement(By.id("pword")).sendKeys("123456789");
		driver.findElement(By.id("clickLogin")).click();
		Thread.sleep(5000);
	}
	
	public boolean RectifyButton() throws Exception {
		System.setProperty("webdriver.gecko.driver", "C:\\WebDriver\\bin\\geckodriver.exe");
		FirefoxDriver driver = new FirefoxDriver();

		Login(driver);

		driver.get("https://claudiachin.github.io/T5_50.003_SingHealth/src/html/directory.html");
		Thread.sleep(5000);
		
		// select tenant
		List<WebElement> sects = driver.findElements(By.className("sect"));
		boolean clicked = false;
		int i = 0;
		while (!clicked) {
			if (sects.get(i).getText().contains("Non-F&B")) {
				sects.get(i).click();
				clicked = true;
			} else {
				i += 1;
			}
		}
		Thread.sleep(5000);
		
		// selects report in stack -- usually has some non-rectified items
		driver.findElement(By.className("card")).click();
		Thread.sleep(1000);
		
		// go to next page from start page
		driver.findElement(By.className("next-button")).click();
		Thread.sleep(5000);
		
		// if btn not on page, click to next page
		boolean found = false;
		WebElement rectBtn = null;
		while (!found) {
			try {
				rectBtn = driver.findElement(By.className("rect-btn"));
				found = true;
			} catch (NoSuchElementException e) {
				System.out.println(e);
				driver.findElement(By.className("next-button")).click();
				Thread.sleep(5000);
			} 
		}

		// find btn and click
		rectBtn.click();
		if (!rectBtn.getText().equals("Rectified")) {
			System.out.println("rectified text wrong");
			driver.close();
			return false;
		}
		if (!rectBtn.getCssValue("background-color").equals("rgb(75, 241, 34)")) { //"#4bf122" = rgb(75, 241, 34)
			System.out.println("background colour wrong");
			driver.close();
			return false;
		}
		
		System.out.println("test passed!");
		Thread.sleep(5000);
		driver.close();
		return true;
	}
	
	@Test
	public void RectifyButtonTest() throws Exception {
		assertEquals(true, RectifyButton());
	}
}
