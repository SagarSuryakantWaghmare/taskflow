package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Page object for /signup.
 */
public class SignupPage extends BasePage {

    private final By nameInput = By.id("name");
    private final By emailInput = By.id("email");
    private final By passwordInput = By.id("password");
    private final By confirmPasswordInput = By.id("confirmPassword");
    private final By createAccountButton = By.cssSelector("button[type='submit']");
    private final By signInLink = By.xpath("//button[normalize-space()='Sign in']");
    private final By errorMessage = By.xpath("//p[contains(@class,'text-red-400')]");
    private final By successMessage = By.xpath("//p[contains(@class,'text-green-400')]");

    public SignupPage(WebDriver driver) {
        super(driver);
    }

    public SignupPage open(String uiBaseUrl) {
        driver.get(uiBaseUrl + "/signup");
        waitForVisible(nameInput);
        return this;
    }

    public void signup(String name, String email, String password, String confirmPassword) {
        type(nameInput, name);
        type(emailInput, email);
        type(passwordInput, password);
        type(confirmPasswordInput, confirmPassword);
        click(createAccountButton);
    }

    public void goToLogin() {
        click(signInLink);
    }

    public boolean isErrorBannerVisible() {
        return isDisplayed(errorMessage);
    }

    public String getErrorMessage() {
        return getText(errorMessage);
    }

    public boolean isSuccessBannerVisible() {
        return isDisplayed(successMessage);
    }

    public String getSuccessMessage() {
        return getText(successMessage);
    }

    public boolean isOnSignupPage() {
        return getCurrentUrl().contains("/signup");
    }
}
