import static org.junit.Assert.assertEquals;

import java.util.concurrent.TimeUnit;

import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.WebDriverManager;
import junit.framework.Assert;

public class loginTest {
	
	// Have to use maven and pom.xml
	public static WebDriver driver;
	public static WebDriverWait wait;
	public static String browser="chrome";
	public static String website= "https://claudiachin.github.io/T5_50.003_SingHealth/";
	
	@Before
	public void runBeforeEachTest() {
		if (browser.equals("Firefox"))
		{
			WebDriverManager.firefoxdriver().setup();
			driver = new FirefoxDriver();
		}
		else if (browser.equals("chrome"))
		{
			WebDriverManager.chromedriver().setup();
			driver = new ChromeDriver();
		}
		else if (browser.equals("edge"))
		{
			WebDriverManager.edgedriver().setup();
			driver = new EdgeDriver();
		}
		// Wait implicitly so that web can load
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		
		// Explicit wait
		wait = new WebDriverWait(driver, 10);
	}
	
	
	@Test
	public void correctEmailandPassword(){
		driver.get(website);
//		Dimension dimension = new Dimension(300,800);
//		driver.manage().window().setSize(dimension);
		driver.manage().window().maximize();
		driver.findElement(By.id("email")).sendKeys("test@mymail.sutd.edu.sg");
		driver.findElement(By.id("pword")).sendKeys("123456789");
		driver.findElement(By.id("clickLogin")).click();
		
		String expectedEmail = "test@mymail.sutd.edu.sg";
		wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath("/html/body/div[2]/div/div[1]/p[2]"), expectedEmail));
		String actualEmail = driver.findElement(By.xpath("/html/body/div[2]/div/div[1]/p[2]")).getText();
		
		driver.close();
		
		assertEquals(expectedEmail,actualEmail);
		System.out.printf("%s\n", actualEmail);
		
	}
	
	@Test
	public void longPassword(){
		driver.get(website);
//		Dimension dimension = new Dimension(300,800);
//		driver.manage().window().setSize(dimension);
		driver.manage().window().maximize();
		
		driver.findElement(By.xpath("/html/body/div[1]/div[1]/button[2]")).click();
		
		driver.findElement(By.id("email")).sendKeys("dylan1997@live.com.sg");
		driver.findElement(By.id("pword")).sendKeys("3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609");
//		driver.findElement(By.id("clickLogin")).click();
//		
//		
//		String expectedEmail = "dylan1997@live.com.sg";
//		wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath("/html/body/div[2]/div/div[1]/p[2]"), expectedEmail));
//		String actualEmail = driver.findElement(By.xpath("/html/body/div[2]/div/div[1]/p[2]")).getText();
		
		driver.close();
		
//		assertEquals(expectedEmail,actualEmail);
//		System.out.printf("%s\n", actualEmail);
		
	}
	
	@Test
	public void wrongEmail(){
		driver.get(website);
//		Dimension dimension = new Dimension(300,800);
//		driver.manage().window().setSize(dimension);
		driver.manage().window().maximize();
		driver.findElement(By.id("email")).sendKeys("invalid@sg");
		driver.findElement(By.id("pword")).sendKeys("123456789");
		driver.findElement(By.id("clickLogin")).click();
		
		String msg = "The account does not exist! Please try again.";
		wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath("/html/body/div[1]/p[1]"), msg));
		String actualmsg = driver.findElement(By.xpath("/html/body/div[1]/p[1]")).getText();
		
		driver.close();
		
		
		
		assertEquals(msg,actualmsg);
		System.out.printf("%s\n", actualmsg);
		
	}
	
	@Test
	public void testWrongPassword(){
		driver.get(website);
//		Dimension dimension = new Dimension(300,800);
//		driver.manage().window().setSize(dimension);
		driver.manage().window().maximize();
		driver.findElement(By.id("email")).sendKeys("test@mymail.sutd.edu.sg");
		driver.findElement(By.id("pword")).sendKeys("987654321");
		driver.findElement(By.id("clickLogin")).click();
		
		String expectedError = "The password is invalid or the user does not have a password.";
		wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath("/html/body/div[1]/p[1]"), expectedError));
		String actualError = driver.findElement(By.xpath("/html/body/div[1]/p[1]")).getText();
		
		driver.close();
		
		assertEquals(expectedError,actualError);
		System.out.printf("%s\n", actualError);
	}
	
	@Test
	public void testShortPassword(){
		driver.get(website);
//		Dimension dimension = new Dimension(300,800);
//		driver.manage().window().setSize(dimension);
		driver.manage().window().maximize();
		driver.findElement(By.id("email")).sendKeys("test@mymail.sutd.edu.sg");
		driver.findElement(By.id("pword")).sendKeys("987");
		driver.findElement(By.id("clickLogin")).click();
		
		String expectedError = "The password is invalid or the user does not have a password.";
		wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath("/html/body/div[1]/p[1]"), expectedError));
		String actualError = driver.findElement(By.xpath("/html/body/div[1]/p[1]")).getText();
		
		driver.close();
		
		assertEquals(expectedError,actualError);
		System.out.printf("%s\n", actualError);
	}
	
//	@Test
//	public void testBruteForce() throws InterruptedException{
//		driver.get(website);
////		Dimension dimension = new Dimension(300,800);
////		driver.manage().window().setSize(dimension);
//		driver.manage().window().maximize();
//		
//		String actualError = null;
//		String expectedError = "The password is invalid or the user does not have a password.";
//		String BruteForceError = "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
//		int i=1;
//		while (i<=10) {
////			driver.findElement(By.id("email")).sendKeys("hacked@google.com");
//			driver.findElement(By.id("email")).sendKeys("hacked2@google.com");
//			driver.findElement(By.id("pword")).sendKeys("987");
//			driver.findElement(By.id("clickLogin")).click();
////			wait.until(ExpectedConditions.textToBePresentInElementLocated(By.xpath("/html/body/div[1]/p[1]"), expectedError));
//			actualError = driver.findElement(By.xpath("/html/body/div[1]/p[1]")).getText();
//			i++;
//			Thread.sleep(500);
//			
//			if (actualError.equals(BruteForceError)) {
//				break;
//			}
//		}
//		
////		driver.close();
//		assertEquals(BruteForceError,actualError);
//		System.out.printf("%s\n", actualError);
//	}
	
}
