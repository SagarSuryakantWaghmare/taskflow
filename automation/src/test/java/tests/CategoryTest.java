package tests;

import base.ApiBaseTest;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;
import utils.TestDataReader;

/**
 * API tests for /api/categories - custom category CRUD and the rules that
 * protect the four default categories shipped by the backend.
 */
public class CategoryTest extends ApiBaseTest {

    private static final String DEFAULT_CATEGORY_ID = "default-0";
    private static String createdCategoryId;
    private static String createdCategoryName;

    @Test(groups = {"api", "category", "smoke"}, priority = 1)
    public void testCreateCategory() {
        createdCategoryName = TestDataReader.uniqueName(TestDataReader.get("categoryData", "name"));

        Response response = authApi()
                .body(TestDataReader.buildCategoryBody(createdCategoryName,
                        TestDataReader.get("categoryData", "color")))
                .when()
                .post(getProperty("categories.endpoint"));

        Assert.assertEquals(response.statusCode(), 201, "Category should be created");
        Assert.assertTrue(response.jsonPath().getBoolean("success"), "success should be true");
        Assert.assertEquals(response.jsonPath().getString("data.category.name"), createdCategoryName);

        createdCategoryId = response.jsonPath().getString("data.category._id");
        Assert.assertNotNull(createdCategoryId, "Created category must return an id");
    }

    @Test(groups = {"api", "category", "smoke"}, priority = 2)
    public void testGetCategoriesReturnsDefaultsAndCustom() {
        Response response = authApi().when().get(getProperty("categories.endpoint"));

        Assert.assertEquals(response.statusCode(), 200, "Category list should be returned");
        Assert.assertTrue(response.jsonPath().getBoolean("success"), "success should be true");

        Assert.assertTrue(response.jsonPath().getList("data.categories.name").containsAll(
                        java.util.List.of("Work", "Personal", "Shopping", "Health")),
                "The four default categories should always be present");
        Assert.assertTrue(response.jsonPath().getList("data.categories.name").contains(createdCategoryName),
                "The newly created category should appear in the list");
    }

    @Test(groups = {"api", "category", "regression"}, priority = 3)
    public void testCreateDuplicateCategory() {
        Response response = authApi()
                .body(TestDataReader.buildCategoryBody(createdCategoryName,
                        TestDataReader.get("categoryData", "color")))
                .when()
                .post(getProperty("categories.endpoint"));

        Assert.assertEquals(response.statusCode(), 400, "Duplicate category name should be rejected");
        Assert.assertEquals(response.jsonPath().getString("message"),
                "Category with this name already exists");
    }

    @Test(groups = {"api", "category", "regression"}, priority = 4)
    public void testCreateCategoryWithoutName() {
        Response response = authApi()
                .body("{ \"color\": \"#3b82f6\" }")
                .when()
                .post(getProperty("categories.endpoint"));

        Assert.assertEquals(response.statusCode(), 400, "Category name is mandatory");
        Assert.assertEquals(response.jsonPath().getString("message"), "Category name is required");
    }

    @Test(groups = {"api", "category", "regression"}, priority = 5)
    public void testUpdateCategory() {
        createdCategoryName = TestDataReader.uniqueName("Automation Category Updated");

        Response response = authApi()
                .body(TestDataReader.buildCategoryBody(createdCategoryName, "#22c55e"))
                .when()
                .put(getProperty("category.by.id.endpoint") + createdCategoryId);

        Assert.assertEquals(response.statusCode(), 200, "Category should be updated");
        Assert.assertTrue(response.jsonPath().getBoolean("success"), "success should be true");
        Assert.assertEquals(response.jsonPath().getString("data.category.name"), createdCategoryName);
        Assert.assertEquals(response.jsonPath().getString("data.category.color"), "#22c55e");
    }

    @Test(groups = {"api", "category", "regression"}, priority = 6)
    public void testDefaultCategoryCannotBeUpdated() {
        Response response = authApi()
                .body(TestDataReader.buildCategoryBody("Renamed Work", "#3b82f6"))
                .when()
                .put(getProperty("category.by.id.endpoint") + DEFAULT_CATEGORY_ID);

        Assert.assertEquals(response.statusCode(), 403, "Default categories are read only");
        Assert.assertEquals(response.jsonPath().getString("message"), "Cannot modify default categories");
    }

    @Test(groups = {"api", "category", "regression"}, priority = 7)
    public void testDefaultCategoryCannotBeDeleted() {
        Response response = authApi()
                .when()
                .delete(getProperty("category.by.id.endpoint") + DEFAULT_CATEGORY_ID);

        Assert.assertEquals(response.statusCode(), 403, "Default categories cannot be removed");
        Assert.assertEquals(response.jsonPath().getString("message"), "Cannot delete default categories");
    }

    @Test(groups = {"api", "category", "regression"}, priority = 8)
    public void testCategoriesRequireToken() {
        Response response = api().when().get(getProperty("categories.endpoint"));

        Assert.assertEquals(response.statusCode(), 401, "Category APIs must be protected");
        Assert.assertEquals(response.jsonPath().getString("message"), "Access denied. No token Provided.");
    }

    @Test(groups = {"api", "category", "smoke"}, priority = 9)
    public void testDeleteCategory() {
        Response response = authApi()
                .when()
                .delete(getProperty("category.by.id.endpoint") + createdCategoryId);

        Assert.assertEquals(response.statusCode(), 200, "Category should be deleted");
        Assert.assertTrue(response.jsonPath().getBoolean("success"), "success should be true");
        Assert.assertEquals(response.jsonPath().getString("message"), "Category deleted successfully");
    }

    @Test(groups = {"api", "category", "regression"}, priority = 10)
    public void testDeletedCategoryIsNotFound() {
        Response response = authApi()
                .when()
                .delete(getProperty("category.by.id.endpoint") + createdCategoryId);

        Assert.assertEquals(response.statusCode(), 404, "A deleted category should no longer be reachable");
        Assert.assertEquals(response.jsonPath().getString("message"), "Category not found or access denied");
    }
}
