Feature: Create a Route
    Scenario: Diego creates a new Route
        Given Diego logs into the application without problems
        When Diego creates a Route with name, description and a gpx file but without images
        Then Diego can see his route on the feed tab