package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Page object for /dashboard - sidebar navigation, the task modal and the task cards.
 */
public class DashboardPage extends BasePage {

    private final By dashboardHeading = By.xpath("//h1[normalize-space()='Dashboard']");
    private final By tasksNavButton = By.xpath("//button[normalize-space()='Tasks']");
    private final By categoriesNavButton = By.xpath("//button[normalize-space()='Categories']");
    private final By allTasksHeading = By.xpath("//h1[normalize-space()='All Tasks']");
    private final By addTaskButton = By.xpath("//button[span[normalize-space()='Add Task']]");

    // Task modal
    private final By modalHeading = By.xpath("//h2[normalize-space()='Add New Task']");
    private final By titleInput = By.xpath("//input[@placeholder='Title *']");
    private final By descriptionInput = By.xpath("//textarea[@placeholder='Description']");
    private final By saveTaskButton = By.xpath("//button[normalize-space()='Add Task']");

    // Toast notification
    private final By notification = By.xpath("//p[@class='text-sm font-medium']");

    public DashboardPage(WebDriver driver) {
        super(driver);
    }

    public boolean isDashboardLoaded() {
        try {
            wait.until(ExpectedConditions.urlContains("/dashboard"));
            return isDisplayed(dashboardHeading);
        } catch (Exception e) {
            return false;
        }
    }

    public DashboardPage openTasksView() {
        click(tasksNavButton);
        waitForVisible(allTasksHeading);
        return this;
    }

    public DashboardPage openCategoriesView() {
        click(categoriesNavButton);
        return this;
    }

    /** Opens the modal, fills the form and saves the task. */
    public DashboardPage addTask(String title, String description) {
        click(addTaskButton);
        waitForVisible(modalHeading);
        type(titleInput, title);
        type(descriptionInput, description);
        click(saveTaskButton);
        return this;
    }

    public boolean isTaskVisible(String title) {
        return isDisplayed(taskTitle(title));
    }

    public boolean isTaskRemoved(String title) {
        try {
            return wait.until(ExpectedConditions.invisibilityOfElementLocated(taskTitle(title)));
        } catch (Exception e) {
            return false;
        }
    }

    public DashboardPage deleteTask(String title) {
        click(taskActionButton(title, "Delete task"));
        return this;
    }

    public DashboardPage toggleTask(String title) {
        click(By.xpath("//h3[normalize-space()='" + title + "']/../preceding-sibling::button"));
        return this;
    }

    public String getNotificationMessage() {
        return getText(notification);
    }

    private By taskTitle(String title) {
        return By.xpath("//h3[normalize-space()='" + title + "']");
    }

    /** The edit / delete buttons sit two levels above the task title inside the same card. */
    private By taskActionButton(String title, String ariaLabel) {
        return By.xpath("//h3[normalize-space()='" + title + "']/../..//button[@aria-label='" + ariaLabel + "']");
    }
}
