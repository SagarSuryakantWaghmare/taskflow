package utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

/**
 * Reads testdata.json and builds the JSON request bodies used by the API tests.
 */
public final class TestDataReader {
    private static final ObjectMapper MAPPER = new ObjectMapper();
    private static final Map<String, Map<String, String>> TEST_DATA = loadTestData();

    private TestDataReader() {
    }

    public static Map<String, String> getScenario(String key) {
        Map<String, String> scenario = TEST_DATA.get(key);
        if (scenario == null) {
            throw new IllegalArgumentException("Unknown test data scenario: " + key);
        }
        return scenario;
    }

    public static String get(String scenarioKey, String field) {
        return getScenario(scenarioKey).get(field);
    }

    public static String buildLoginBody(String key) {
        Map<String, String> scenario = getScenario(key);
        return String.format("{ \"email\": \"%s\", \"password\": \"%s\" }",
                scenario.get("email"),
                scenario.get("password"));
    }

    public static String buildRegisterBody(String name, String email, String password) {
        return String.format("{ \"name\": \"%s\", \"email\": \"%s\", \"password\": \"%s\" }",
                name, email, password);
    }

    public static String buildTaskBody(String key) {
        Map<String, String> scenario = getScenario(key);
        return String.format("{ \"title\": \"%s\", \"description\": \"%s\", \"priority\": \"%s\", \"category\": \"%s\" }",
                scenario.get("title"),
                scenario.get("description"),
                scenario.get("priority"),
                scenario.get("category"));
    }

    public static String buildCategoryBody(String name, String color) {
        return String.format("{ \"name\": \"%s\", \"color\": \"%s\" }", name, color);
    }

    /** Register and category tests must not clash on re-runs, so the suite always uses fresh values. */
    public static String uniqueEmail() {
        return "automation" + System.currentTimeMillis() + "@gmail.com";
    }

    public static String uniqueName(String prefix) {
        return prefix + " " + System.currentTimeMillis();
    }

    private static Map<String, Map<String, String>> loadTestData() {
        try (InputStream inputStream = TestDataReader.class.getClassLoader().getResourceAsStream("testdata.json")) {
            if (inputStream == null) {
                throw new IllegalStateException("testdata.json was not found on the test classpath");
            }
            return MAPPER.readValue(inputStream, new TypeReference<Map<String, Map<String, String>>>() {});
        } catch (IOException e) {
            throw new ExceptionInInitializerError(e);
        }
    }
}
