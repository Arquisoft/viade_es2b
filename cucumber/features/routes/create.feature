Feature: Create a route
    
    Scenario: John wants to create a route  
        Given John has logged into the application without problems
        When John creates a public route with name and description, but with no images and gpx file
        Then John can click and view his route on the feed tab, on public routes