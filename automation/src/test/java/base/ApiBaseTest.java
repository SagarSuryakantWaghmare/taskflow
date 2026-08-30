package base;

import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import utils.TokenManager;

import static io.restassured.RestAssured.given;

/**
 * Parent for the REST Assured tests. Gives every API test a ready request
 * specification, with or without the JWT header.
 */
public abstract class ApiBaseTest extends BaseTest {

    /** Request without authentication - used for login, register and negative token tests. */
    protected RequestSpecification api() {
        return given()
                .baseUri(apiBaseUrl)
                .contentType(ContentType.JSON);
    }

    /** Request carrying the demo user's JWT - used for all protected endpoints. */
    protected RequestSpecification authApi() {
        return api().header("Authorization", "Bearer " + TokenManager.getToken());
    }
}
