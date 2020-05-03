Feature: Edit a route
    
    Scenario: John wants to edit a route  
        Given John has logged into the application without problems
        When John edit a public route with name and description, but with no images and gpx file
        Then John can click and view his route edited on the feed tab, on public routes