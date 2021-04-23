package seleniumTesting;

import static org.junit.Assert.assertEquals;

import java.io.File;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.firefox.FirefoxDriver;

public class Chart {

	public void Login(FirefoxDriver driver) throws Exception {
		driver.get("https://claudiachin.github.io/T5_50.003_SingHealth");
		Thread.sleep(1000);

		driver.findElement(By.id("email")).sendKeys("test@mymail.sutd.edu.sg");
		driver.findElement(By.id("pword")).sendKeys("123456789");
		driver.findElement(By.id("clickLogin")).click();
		Thread.sleep(5000);
	}

	public boolean Download() throws Exception {
		System.setProperty("webdriver.gecko.driver", "C:\\WebDriver\\bin\\geckodriver.exe");
		FirefoxDriver driver = new FirefoxDriver();

		Login(driver);

		driver.get("https://claudiachin.github.io/T5_50.003_SingHealth/src/html/trends.html");
		driver.findElement(By.id("institution")).click();
		driver.findElement(By.id("instgenerate")).click();
		Thread.sleep(5000);
		
		driver.findElement(By.id("download")).click();
		Thread.sleep(10000); // manually accept download :(
		
		if (!isFileDownloaded("ChartImage.png")) {
			System.out.println("chart image not found");
			driver.close();
			return false;
		}
		
		if (!isFileDownloaded("statistic.csv")) {
			System.out.println("statistic csv not found");
			driver.close();
			return false;
		}
		
		System.out.println("test passed!");
		Thread.sleep(5000);
		driver.close();
		return true;
	}

	public boolean isFileDownloaded(String fileName) {
		File dir = new File("C:\\Users\\claud\\Downloads");
		File[] dirContents = dir.listFiles();

		for (int i = 0; i < dirContents.length; i++) {
			if (dirContents[i].getName().equals(fileName)) {
				// File has been found, it can now be deleted:
				dirContents[i].delete();
				return true;
			}
		}
		return false;
	}

	@Test
	public void DownloadTest() throws Exception {
		assertEquals(true, Download());
	}

}
