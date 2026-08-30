package base;

import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import utils.ConfigReader;

import java.lang.reflect.Method;

/**
 * Common parent for every test. Holds the environment values read from config.properties
 * and prints a simple start/finish log line for each test method.
 */
public abstract class BaseTest {
    protected String apiBaseUrl;
    protected String uiBaseUrl;

    @BeforeMethod(alwaysRun = true)
    public void beforeEachTest(Method method) {
        apiBaseUrl = ConfigReader.get("base.url");
        uiBaseUrl = ConfigReader.get("ui.base.url");
        System.out.println("START -> " + method.getDeclaringClass().getSimpleName() + "." + method.getName());
    }

    @AfterMethod(alwaysRun = true)
    public void afterEachTest(Method method) {
        System.out.println("END   -> " + method.getDeclaringClass().getSimpleName() + "." + method.getName());
    }

    public static String getProperty(String key) {
        return ConfigReader.get(key);
    }
}
