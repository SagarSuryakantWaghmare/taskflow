package tests;

import base.ApiBaseTest;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;
import utils.TestDataReader;

/**
 * API tests for /api/todos - the full task lifecycle plus the negative cases.
 * The methods run in priority order and share the id of the task created first.
 */
public class TaskTest extends ApiBaseTest {

    private static final String NON_EXISTING_ID = "64b7f1c2e4b0a1d2c3f4e5a6";
    private static String createdTaskId;

    @Test(groups = {"api", "task", "smoke"}, priority = 1)
    public void testCreateTask() {
        Response response = authApi()
                .body(TestDataReader.buildTaskBody("taskData"))
                .when()
                .post(getProperty("todos.endpoint"));

        Assert.assertEquals(response.statusCode(), 201, "Task should be created");
        Assert.assertTrue(response.jsonPath().getBoolean("success"), "success should be true");
        Assert.assertEquals(response.jsonPath().getString("message"), "Todo created successfully");
        Assert.assertEquals(response.jsonPath().getString("data.todo.title"),
                TestDataReader.get("taskData", "title"));
        Assert.assertEquals(response.jsonPath().getString("data.todo.priority"),
                TestDataReader.get("taskData", "priority"));
        Assert.assertFalse(response.jsonPath().getBoolean("data.todo.completed"),
                "A new task should not be completed");

        createdTaskId = response.jsonPath().getString("data.todo._id");
        Assert.assertNotNull(createdTaskId, "Created task must return an id");
    }

    @Test(groups = {"api", "task", "smoke"}, priority = 2)
    public void testGetAllTasks() {
        Response response = authApi().when().get(getProperty("todos.endpoint"));

        Assert.assertEquals(response.statusCode(), 200, "Task list should be returned");
        Assert.assertTrue(response.jsonPath().getBoolean("success"), "success should be true");
        Assert.assertNotNull(response.jsonPath().getList("data.todos"), "todos array should be present");
        Assert.assertNotNull(response.jsonPath().get("data.pagination"), "pagination block should be present");
        Assert.assertTrue(response.jsonPath().getList("data.todos._id").contains(createdTaskId),
                "The newly created task should appear in the list");
    }

    @Test(groups = {"api", "task", "regression"}, priority = 3)
    public void testGetSingleTask() {
        Response response = authApi()
                .when()
                .get(getProperty("todo.by.id.endpoint") + createdTaskId);

        Assert.assertEquals(response.statusCode(), 200, "Single task should be returned");
        Assert.assertEquals(response.jsonPath().getString("data.todo._id"), createdTaskId);
        Assert.assertEquals(response.jsonPath().getString("data.todo.title"),
                TestDataReader.get("taskData", "title"));
    }

    @Test(groups = {"api", "task", "regression"}, priority = 4)
    public void testFilterTasksByCompletedFlag() {
        Response response = authApi()
                .queryParam("completed", "false")
                .when()
                .get(getProperty("todos.endpoint"));

        Assert.assertEquals(response.statusCode(), 200, "Filtered list should be returned");
        Assert.assertFalse(response.jsonPath().getList("data.todos.completed").contains(true),
                "Filtering by completed=false must not return completed tasks");
    }

    @Test(groups = {"api", "task", "regression"}, priority = 5)
    public void testUpdateTask() {
        Response response = authApi()
                .body(TestDataReader.buildTaskBody("updatedTaskData"))
                .when()
                .put(getProperty("todo.by.id.endpoint") + createdTaskId);

        Assert.assertEquals(response.statusCode(), 200, "Task should be updated");
        Assert.assertEquals(response.jsonPath().getString("message"), "Todo updated successfully");
        Assert.assertEquals(response.jsonPath().getString("data.todo.title"),
                TestDataReader.get("updatedTaskData", "title"));
        Assert.assertEquals(response.jsonPath().getString("data.todo.priority"),
                TestDataReader.get("updatedTaskData", "priority"));
    }

    @Test(groups = {"api", "task", "regression"}, priority = 6)
    public void testToggleTaskStatus() {
        Response response = authApi()
                .when()
                .patch(getProperty("todo.by.id.endpoint") + createdTaskId + getProperty("todo.toggle.endpoint"));

        Assert.assertEquals(response.statusCode(), 200, "Task status should toggle");
        Assert.assertEquals(response.jsonPath().getString("message"), "Todo status updated successfully");
        Assert.assertTrue(response.jsonPath().getBoolean("data.todo.completed"),
                "Task should be marked as completed after the first toggle");
    }

    @Test(groups = {"api", "task", "smoke"}, priority = 7)
    public void testDeleteTask() {
        Response response = authApi()
                .when()
                .delete(getProperty("todo.by.id.endpoint") + createdTaskId);

        Assert.assertEquals(response.statusCode(), 200, "Task should be deleted");
        Assert.assertTrue(response.jsonPath().getBoolean("success"), "success should be true");
        Assert.assertEquals(response.jsonPath().getString("message"), "Todo deleted successfully");
    }

    @Test(groups = {"api", "task", "regression"}, priority = 8)
    public void testDeletedTaskIsNotFound() {
        Response response = authApi()
                .when()
                .get(getProperty("todo.by.id.endpoint") + createdTaskId);

        Assert.assertEquals(response.statusCode(), 404, "A deleted task should no longer be reachable");
        Assert.assertEquals(response.jsonPath().getString("message"), "Todo not found");
    }

    @Test(groups = {"api", "task", "regression"}, priority = 9)
    public void testGetTaskWithUnknownId() {
        Response response = authApi()
                .when()
                .get(getProperty("todo.by.id.endpoint") + NON_EXISTING_ID);

        Assert.assertEquals(response.statusCode(), 404, "Unknown id should return not found");
        Assert.assertEquals(response.jsonPath().getString("message"), "Todo not found");
    }

    @Test(groups = {"api", "task", "regression"}, priority = 10)
    public void testCreateTaskWithoutToken() {
        Response response = api()
                .body(TestDataReader.buildTaskBody("taskData"))
                .when()
                .post(getProperty("todos.endpoint"));

        Assert.assertEquals(response.statusCode(), 401, "Task APIs must be protected");
        Assert.assertEquals(response.jsonPath().getString("message"), "Access denied. No token Provided.");
    }

    @Test(groups = {"api", "task", "regression"}, priority = 11)
    public void testCreateTaskWithoutTitle() {
        Response response = authApi()
                .body("{ \"description\": \"A description without any title at all\" }")
                .when()
                .post(getProperty("todos.endpoint"));

        Assert.assertEquals(response.statusCode(), 400, "Title is mandatory");
        Assert.assertTrue(response.jsonPath().getString("message").contains("Todo title is required"),
                "Validation message should mention the missing title");
    }

    @Test(groups = {"api", "task", "regression"}, priority = 12)
    public void testCreateTaskWithShortDescription() {
        Response response = authApi()
                .body("{ \"title\": \"Short description task\", \"description\": \"too short\" }")
                .when()
                .post(getProperty("todos.endpoint"));

        Assert.assertEquals(response.statusCode(), 400, "Description below 10 characters is invalid");
        Assert.assertTrue(
                response.jsonPath().getString("message").contains("Description must be greater than 10 characters"),
                "Validation message should mention the description length");
    }
}
