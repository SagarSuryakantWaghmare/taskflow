package base;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import utils.DriverManager;

/**
 * Parent for the Selenium tests. Opens a browser before every UI test and always
 * closes it afterwards, even when the test fails.
 */
public abstract class UiBaseTest extends BaseTest {

    @BeforeMethod(alwaysRun = true)
    public void openBrowser() {
        DriverManager.createDriver();
    }

    @AfterMethod(alwaysRun = true)
    public void closeBrowser() {
        DriverManager.quitDriver();
    }

    protected WebDriver driver() {
        return DriverManager.getDriver();
    }
}
