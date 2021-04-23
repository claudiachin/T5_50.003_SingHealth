package seleniumTesting;

import static org.junit.Assert.assertEquals;

import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class CreateReport {

	public void Login(FirefoxDriver driver) throws Exception {
		driver.get("https://claudiachin.github.io/T5_50.003_SingHealth");
		Thread.sleep(1000);

		driver.findElement(By.id("email")).sendKeys("test@mymail.sutd.edu.sg");
		driver.findElement(By.id("pword")).sendKeys("123456789");
		driver.findElement(By.id("clickLogin")).click();
		Thread.sleep(5000);
	}

	public boolean CategoryScoreTabulation() throws Exception {
		System.setProperty("webdriver.gecko.driver", "C:\\WebDriver\\bin\\geckodriver.exe");
		FirefoxDriver driver = new FirefoxDriver();

		Login(driver);

		driver.get(
				"https://claudiachin.github.io/T5_50.003_SingHealth/src/html/create_report/fnb/professionalism_staff_hygiene.html");
		Thread.sleep(1000);

		List<WebElement> checkboxes = driver.findElementsByClassName("checkbox");
		int noOfTicks = 0;
		int noOfInvalid = 0;
		int[] rDataset = new int[checkboxes.size()];
		JavascriptExecutor js = (JavascriptExecutor) driver;

		// make random test set
		Random r = new Random();
		for (int i = 0; i < checkboxes.size(); i++) {
			int value = r.nextInt(3); // [0,3) = [0,2]

			if (value == 0) { // tick
				noOfTicks += 1;
				checkboxes.get(i).click();
			} else if (value == 1) { // cross
				checkboxes.get(i).click();
				checkboxes.get(i).click();
			} else { // invalid
				noOfInvalid += 1;
				checkboxes.get(i).click();
				checkboxes.get(i).click();
				checkboxes.get(i).click();
			}
			rDataset[i] = value;
			js.executeScript("window.scrollBy(0,250)", "");
		}

		int score = Integer.parseInt(driver.findElementById("score").getText());
		int outOf = Integer.parseInt(driver.findElementById("out-of").getText());

		System.out.println("Dataset: " + Arrays.toString(rDataset));
		System.out.println("Score from page: " + score);
		System.out.println("OutOf from page: " + outOf);
		System.out.println("Correct Score: " + noOfTicks);
		System.out.println("Correct OutOf: " + (checkboxes.size() - noOfInvalid));

		if (outOf == checkboxes.size() - noOfInvalid && score == noOfTicks) { // outOf = 13 - 4 = 9, score = 7
			System.out.println("test passed!");
			Thread.sleep(5000);
			driver.close();
			return true;
		} else {
			System.out.println("code is wrong");
			driver.close();
			return false;
		}

	}

	@Test
	public void CategoryScoreTabulationTest() throws Exception {
		assertEquals(true, CategoryScoreTabulation());
	}

	public boolean FileUpload() throws Exception {
		System.setProperty("webdriver.gecko.driver", "C:\\WebDriver\\bin\\geckodriver.exe");
		FirefoxDriver driver = new FirefoxDriver();

		Login(driver);

		driver.get(
				"https://claudiachin.github.io/T5_50.003_SingHealth/src/html/create_report/fnb/professionalism_staff_hygiene.html");
		Thread.sleep(1000);

		List<WebElement> checkboxes = driver.findElementsByClassName("checkbox");
		for (int i = 0; i < checkboxes.size(); i++) {
			checkboxes.get(i).click(); // all tick
			if (i == checkboxes.size() - 1) { // except last one, cross
				checkboxes.get(i).click();
				WebElement uploadElement = driver.findElementById("imgPicker" + i);
				uploadElement.sendKeys("C:\\Users\\claud\\Desktop\\admin\\lol.jpg");
				uploadElement.sendKeys("C:\\Users\\claud\\Desktop\\admin\\lolol.jpg");
			}
		}
		Thread.sleep(1000);

		WebElement fileList = driver.findElementsByClassName("upload-div").get(0);
		if (fileList.getText().equals("lol.jpg\nlolol.jpg")) {
			System.out.println("test passed!");
			Thread.sleep(5000);
			driver.close();
			return true;
		} else {
			System.out.println("code is wrong");
			driver.close();
			return false;
		}
	}

	@Test
	public void FileUploadTest() throws Exception {
		assertEquals(true, FileUpload());
	}

	public boolean OverallScoreTabulation() throws Exception {
		System.setProperty("webdriver.gecko.driver", "C:\\WebDriver\\bin\\geckodriver.exe");
		FirefoxDriver driver = new FirefoxDriver();

		Login(driver);

		// start page
		driver.get("https://claudiachin.github.io/T5_50.003_SingHealth/src/html/create_report/start.html");
		Thread.sleep(5000);
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
		Thread.sleep(1000);
		driver.findElement(By.className("next-button")).click();

		// checklist pages
		int[][] results = new int[4][2];
		JavascriptExecutor js = (JavascriptExecutor) driver;
		
		for (int j = 0; j < 4; j++) {
			Thread.sleep(2000);
			List<WebElement> checkboxes = driver.findElementsByClassName("checkbox");

			// make random test set
			Random r = new Random();
			for (int k = 0; k < checkboxes.size(); k++) {
				int value = r.nextInt(3); // [0,3) = [0,2]

				if (value == 0) { // tick
					checkboxes.get(k).click();
				} else if (value == 1) { // cross
					checkboxes.get(k).click();
					checkboxes.get(k).click();
				} else { // invalid
					checkboxes.get(k).click();
					checkboxes.get(k).click();
					checkboxes.get(k).click();
				}
				js.executeScript("window.scrollBy(0,250)", "");
			}

			results[j][0] = Integer.parseInt(driver.findElementById("score").getText());
			results[j][1] = Integer.parseInt(driver.findElementById("out-of").getText());
			Thread.sleep(1000);
			driver.findElement(By.id("save-button")).click();
			Thread.sleep(2000);
			driver.findElement(By.className("next-button")).click();
		}
		
		// end page
		Thread.sleep(5000);
		String[] pageStrings = {driver.findElement(By.id("professionalism")).getText(), 
				driver.findElement(By.id("general_cleanliness")).getText(), 
				driver.findElement(By.id("workplace_safety")).getText()};
		String covid = driver.findElement(By.id("covid")).getText();
		String overall = driver.findElement(By.id("overall")).getText();
	
		int[] weights = {20, 40, 40};
		double calculatedOverall = 0;
		DecimalFormat df = new DecimalFormat("0.#");
		for (int x=0; x<3; x++) {
			int score = results[x][0];
			int outOf = results[x][1];
			double result = calculateResult(score, outOf, weights[x]);
			calculatedOverall += result;
			
			String resultString = score+"/"+outOf+" - "+df.format(result)+"%";
			
			if (!pageStrings[x].contentEquals(resultString)) {
				System.out.println("code is wrong");
				System.out.println(pageStrings[x]);
				System.out.println(resultString);
				return false;
			}
		}
		
		if (!covid.contentEquals(results[3][0]+"/"+results[3][1])) {
			System.out.println("covid code is wrong");
			System.out.println(covid);
			System.out.println(results[3][0]+"/"+results[3][1]);
			return false;
		}
		
		if (!overall.contentEquals(df.format(calculatedOverall)+"%")) {
			System.out.println("overall code is wrong");
			System.out.println(overall);
			System.out.println(calculatedOverall);
			System.out.println(df.format(calculatedOverall)+"%");
			return false;
		}

		System.out.println("test passed!");
		Thread.sleep(5000);
		driver.close();
		return true;
	}

	public double calculateResult(int score, int outOf, int weight) {
		if (score == 0 && outOf == 0) {
			return (double) weight;
		} else {
			return (double) score / (double) outOf * (double) weight;
		}
	}

	@Test
	public void OverallScoreTabulationTest() throws Exception {
		assertEquals(true, OverallScoreTabulation());
	}
	
	public boolean Filter(String filter) throws Exception {
		System.setProperty("webdriver.gecko.driver", "C:\\WebDriver\\bin\\geckodriver.exe");
		FirefoxDriver driver = new FirefoxDriver();
		
		Login(driver);
		
		driver.get("https://claudiachin.github.io/T5_50.003_SingHealth/src/html/create_report/start.html");
		Thread.sleep(5000);
		
		driver.findElementById("search").sendKeys(filter);
		
		List<WebElement> sects = driver.findElementsByClassName("sect");
		List<WebElement> tenantTexts = driver.findElementsByClassName("tenant-text");
		
		for (int i=0; i<sects.size(); i++) {
			if (!sects.get(i).getAttribute("style").contains("none") && !tenantTexts.get(i).getText().toLowerCase().contains(filter)) {
				driver.close();
				System.out.println("displaying " + tenantTexts.get(i).getText() + " incorrectly");
				return false;
			}
		}
		
		System.out.println("test passed");
		Thread.sleep(5000);
		driver.close();
		return true;

	}
	
	@Test public void FilterTest() throws Exception {
		assertEquals(true, Filter("skh"));
		assertEquals(true, Filter("cgh"));
	}
}
