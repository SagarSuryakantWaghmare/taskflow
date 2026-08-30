package utils;

import io.restassured.http.ContentType;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

/**
 * Logs in once with the demo user and caches the JWT for every protected API call.
 */
public final class TokenManager {
    private static String token;

    private TokenManager() {
    }

    public static String getToken() {
        if (token == null) {
            token = login();
        }
        return token;
    }

    public static void setToken(String tokenValue) {
        token = tokenValue;
    }

    public static void clearToken() {
        token = null;
    }

    private static String login() {
        Response response = given()
                .baseUri(ConfigReader.get("base.url"))
                .contentType(ContentType.JSON)
                .body(TestDataReader.buildLoginBody("validLogin"))
                .when()
                .post(ConfigReader.get("login.endpoint"));

        if (response.statusCode() != 200) {
            throw new IllegalStateException("Unable to login with the demo user. Status: " + response.statusCode()
                    + ", body: " + response.asString());
        }
        return response.jsonPath().getString("data.token");
    }
}
