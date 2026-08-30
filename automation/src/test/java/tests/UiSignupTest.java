package tests;

import base.UiBaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.SignupPage;
import utils.TestDataReader;

/**
 * Selenium tests for the signup screen.
 */
public class UiSignupTest extends UiBaseTest {

    @Test(groups = {"ui", "smoke"}, priority = 1)
    public void testSignupNewUserUi() {
        SignupPage signupPage = new SignupPage(driver()).open(uiBaseUrl);
        signupPage.signup("Automation User", TestDataReader.uniqueEmail(), "123456", "123456");

        Assert.assertTrue(signupPage.isSuccessBannerVisible(), "A success banner should confirm the signup");
        Assert.assertEquals(signupPage.getSuccessMessage(), "Account created successfully! Please log in.");
    }

    @Test(groups = {"ui", "regression"}, priority = 2)
    public void testSignupWithMismatchedPasswords() {
        SignupPage signupPage = new SignupPage(driver()).open(uiBaseUrl);
        signupPage.signup("Automation User", TestDataReader.uniqueEmail(), "123456", "654321");

        Assert.assertTrue(signupPage.isErrorBannerVisible(), "Mismatched passwords should be blocked");
        Assert.assertEquals(signupPage.getErrorMessage(), "Passwords do not match");
        Assert.assertTrue(signupPage.isOnSignupPage(), "User should remain on the signup page");
    }

    @Test(groups = {"ui", "regression"}, priority = 3)
    public void testSignupWithExistingEmail() {
        SignupPage signupPage = new SignupPage(driver()).open(uiBaseUrl);
        signupPage.signup("Automation User", getProperty("email"), "123456", "123456");

        Assert.assertTrue(signupPage.isErrorBannerVisible(), "An already registered email should be rejected");
        Assert.assertEquals(signupPage.getErrorMessage(), "Account is already existed with this account");
    }
}
