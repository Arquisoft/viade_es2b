Feature: View friends and groups
    
    Scenario: John wants to view his friends and groups of friends
        Given John has logged into the application without problems
        When John clicks on the friends tab and creates a group
        Then John can view his friend and the new group