package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Page object for /login.
 */
public class LoginPage extends BasePage {

    private final By emailInput = By.id("email");
    private final By passwordInput = By.id("password");
    private final By loginButton = By.cssSelector("button[type='submit']");
    private final By signUpLink = By.xpath("//button[normalize-space()='Sign up']");
    private final By successMessage = By.xpath("//p[contains(normalize-space(),'Login successful')]");
    private final By errorMessage = By.xpath("//p[contains(@class,'text-red-400')]");

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    public LoginPage open(String uiBaseUrl) {
        driver.get(uiBaseUrl + "/login");
        waitForVisible(emailInput);
        return this;
    }

    public void login(String email, String password) {
        type(emailInput, email);
        type(passwordInput, password);
        click(loginButton);
    }

    public SignupPage goToSignup() {
        click(signUpLink);
        return new SignupPage(driver);
    }

    public boolean isLoginSuccessBannerVisible() {
        return isDisplayed(successMessage);
    }

    public boolean isErrorBannerVisible() {
        return isDisplayed(errorMessage);
    }

    public String getErrorMessage() {
        return getText(errorMessage);
    }

    public boolean isOnLoginPage() {
        return getCurrentUrl().contains("/login");
    }
}
