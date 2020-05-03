Feature: Delete a route
    
    Scenario: John wants to delete a route  
        Given John has logged into the application without problems
        When John delete a public route with name and description, but with no images and gpx file
        Then John cant click and view his route on the feed tab, on public routes