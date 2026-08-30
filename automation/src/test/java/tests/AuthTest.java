package tests;

import base.ApiBaseTest;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import utils.TestDataReader;

/**
 * API tests for /api/auth - register, login, profile and logout.
 */
public class AuthTest extends ApiBaseTest {

    private static String registeredEmail;

    @Test(groups = {"api", "auth", "smoke"}, priority = 1)
    public void testRegisterNewUser() {
        registeredEmail = TestDataReader.uniqueEmail();
        String body = TestDataReader.buildRegisterBody("Automation User", registeredEmail, "123456");

        Response response = api().body(body).when().post(getProperty("register.endpoint"));

        Assert.assertEquals(response.statusCode(), 201, "New user should be created");
        Assert.assertTrue(response.jsonPath().getBoolean("success"), "success should be true");
        Assert.assertEquals(response.jsonPath().getString("message"), "User registered successfully");
        Assert.assertNotNull(response.jsonPath().getString("data.token"), "Register should return a token");
        Assert.assertEquals(response.jsonPath().getString("data.user.email"), registeredEmail);
    }

    @Test(groups = {"api", "auth", "regression"}, priority = 2)
    public void testRegisterDuplicateEmail() {
        String body = TestDataReader.buildRegisterBody("Automation User", registeredEmail, "123456");

        Response response = api().body(body).when().post(getProperty("register.endpoint"));

        Assert.assertEquals(response.statusCode(), 401, "Duplicate email should be rejected");
        Assert.assertFalse(response.jsonPath().getBoolean("success"), "success should be false");
        Assert.assertEquals(response.jsonPath().getString("message"),
                "Account is already existed with this account");
    }

    @Test(groups = {"api", "auth", "regression"}, priority = 3)
    public void testRegisterWithMissingFields() {
        Response response = api()
                .body("{ \"email\": \"missing.fields@gmail.com\" }")
                .when()
                .post(getProperty("register.endpoint"));

        Assert.assertEquals(response.statusCode(), 400, "Incomplete payload should be rejected");
        Assert.assertEquals(response.jsonPath().getString("message"), "Please provide all required fields");
    }

    @Test(groups = {"api", "auth", "smoke"}, priority = 4)
    public void testLoginSuccess() {
        Response response = api()
                .body(TestDataReader.buildLoginBody("validLogin"))
                .when()
                .post(getProperty("login.endpoint"));

        Assert.assertEquals(response.statusCode(), 200, "Valid login should succeed");
        Assert.assertTrue(response.jsonPath().getBoolean("success"), "success should be true");
        Assert.assertEquals(response.jsonPath().getString("message"), "Login Successfully");
        Assert.assertNotNull(response.jsonPath().getString("data.token"), "Token should be returned for valid login");
        Assert.assertEquals(response.jsonPath().getString("data.user.email"), getProperty("email"));
    }

    @Test(groups = {"api", "auth", "regression"}, priority = 5, dataProvider = "loginScenarios")
    public void testLoginScenarios(String scenarioKey, int expectedStatus, boolean expectToken) {
        Response response = api()
                .body(TestDataReader.buildLoginBody(scenarioKey))
                .when()
                .post(getProperty("login.endpoint"));

        Assert.assertEquals(response.statusCode(), expectedStatus, "Unexpected status for scenario: " + scenarioKey);
        Assert.assertEquals(response.jsonPath().getBoolean("success"), expectedStatus == 200,
                "success flag should match the HTTP status");

        if (expectToken) {
            Assert.assertNotNull(response.jsonPath().getString("data.token"), "Token should be present");
        } else {
            Assert.assertEquals(response.jsonPath().getString("message"), "Invalid credentials");
        }
    }

    @DataProvider(name = "loginScenarios")
    public Object[][] loginScenarios() {
        return new Object[][]{
                {"validLogin", 200, true},
                {"invalidLogin", 401, false},
                {"emptyLogin", 401, false}
        };
    }

    @Test(groups = {"api", "auth", "smoke"}, priority = 6)
    public void testGetProfileWithToken() {
        Response response = authApi().when().get(getProperty("profile.endpoint"));

        Assert.assertEquals(response.statusCode(), 200, "Profile should be returned for a valid token");
        Assert.assertTrue(response.jsonPath().getBoolean("success"), "success should be true");
        Assert.assertEquals(response.jsonPath().getString("data.user.email"), getProperty("email"));
        Assert.assertNull(response.jsonPath().getString("data.user.password"),
                "Password must never be returned by the profile API");
    }

    @Test(groups = {"api", "auth", "regression"}, priority = 7)
    public void testGetProfileWithoutToken() {
        Response response = api().when().get(getProperty("profile.endpoint"));

        Assert.assertEquals(response.statusCode(), 401, "Profile must be protected");
        Assert.assertEquals(response.jsonPath().getString("message"), "Access denied. No token Provided.");
    }

    @Test(groups = {"api", "auth", "regression"}, priority = 8)
    public void testGetProfileWithInvalidToken() {
        Response response = api()
                .header("Authorization", "Bearer this.is.not.a.valid.token")
                .when()
                .get(getProperty("profile.endpoint"));

        Assert.assertEquals(response.statusCode(), 401, "A tampered token must be rejected");
        Assert.assertEquals(response.jsonPath().getString("message"), "Invalid token");
    }

    @Test(groups = {"api", "auth", "regression"}, priority = 9)
    public void testLogout() {
        Response response = authApi().when().post(getProperty("logout.endpoint"));

        Assert.assertEquals(response.statusCode(), 200, "Logout should succeed for a logged in user");
        Assert.assertTrue(response.jsonPath().getBoolean("success"), "success should be true");
        Assert.assertEquals(response.jsonPath().getString("message"), "Logout successfully");
    }
}
