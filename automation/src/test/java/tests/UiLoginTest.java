package tests;

import base.UiBaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.DashboardPage;
import pages.LoginPage;
import pages.SignupPage;

/**
 * Selenium tests for the login screen.
 */
public class UiLoginTest extends UiBaseTest {

    @Test(groups = {"ui", "smoke"}, priority = 1)
    public void testLoginSuccessUi() {
        LoginPage loginPage = new LoginPage(driver()).open(uiBaseUrl);
        loginPage.login(getProperty("email"), getProperty("password"));

        Assert.assertTrue(loginPage.isLoginSuccessBannerVisible(),
                "A success banner should confirm the login");

        DashboardPage dashboardPage = new DashboardPage(driver());
        Assert.assertTrue(dashboardPage.isDashboardLoaded(), "Dashboard should load after successful login");
    }

    @Test(groups = {"ui", "regression"}, priority = 2)
    public void testLoginInvalidUi() {
        LoginPage loginPage = new LoginPage(driver()).open(uiBaseUrl);
        loginPage.login("wrong@gmail.com", "wrong123");

        Assert.assertTrue(loginPage.isErrorBannerVisible(), "Error banner should appear for invalid login");
        Assert.assertEquals(loginPage.getErrorMessage(), "Invalid credentials");
        Assert.assertTrue(loginPage.isOnLoginPage(), "User should remain on login page after invalid login");
    }

    @Test(groups = {"ui", "regression"}, priority = 3)
    public void testNavigateFromLoginToSignup() {
        LoginPage loginPage = new LoginPage(driver()).open(uiBaseUrl);
        SignupPage signupPage = loginPage.goToSignup();

        Assert.assertTrue(signupPage.isOnSignupPage(), "The Sign up link should open the signup page");
    }
}
