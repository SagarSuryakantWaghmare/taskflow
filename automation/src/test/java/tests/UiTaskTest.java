package tests;

import base.UiBaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.DashboardPage;
import pages.LoginPage;
import utils.TestDataReader;

/**
 * Selenium test for the task flow on the dashboard: log in, create a task,
 * see it on the board and delete it again.
 */
public class UiTaskTest extends UiBaseTest {

    @Test(groups = {"ui", "smoke"})
    public void testCreateAndDeleteTaskUi() {
        String taskTitle = TestDataReader.uniqueName("UI Task");
        String taskDescription = "Task created through the Selenium UI test";

        LoginPage loginPage = new LoginPage(driver()).open(uiBaseUrl);
        loginPage.login(getProperty("email"), getProperty("password"));

        DashboardPage dashboardPage = new DashboardPage(driver());
        Assert.assertTrue(dashboardPage.isDashboardLoaded(), "Dashboard should load after successful login");

        dashboardPage.openTasksView().addTask(taskTitle, taskDescription);
        Assert.assertEquals(dashboardPage.getNotificationMessage(), "Task added successfully!");
        Assert.assertTrue(dashboardPage.isTaskVisible(taskTitle), "The new task should be listed on the board");

        dashboardPage.deleteTask(taskTitle);
        Assert.assertTrue(dashboardPage.isTaskRemoved(taskTitle), "The task should disappear after deletion");
    }
}
