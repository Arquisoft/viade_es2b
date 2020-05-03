const puppeteer = require('puppeteer');
const expectPuppeteer = require('expect-puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./cucumber/features/friends/view.feature');

var port = 3000;
let url = 'http://localhost:' + port;
var webID = "https://test111.solid.community/profile/card#me";
var user = "Test111";
var password = "TestTest1?";
var page = null;
var browser = null;

//Function for apply a delay in ms.
function wait(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

beforeAll(async () => {
    //Open browser (Chromium)
    const browser = await puppeteer.launch({
       headless: false,
       defaultViewport: null
   });
   page = await browser.newPage();

   //Clean cookies
   await page.goto('chrome://settings/clearBrowserData');
   await page.keyboard.down('Enter');

   //Access to our page
   await wait(6000);
   await page.goto(url,{waitUntil: 'load', timeout: 0});

   //Select login button
   await page.waitForSelector('button[data-testid="provider-form-button"]');

   //Check if it's logged
   const login = await expect(page).toMatchElement('button[data-testid="provider-form-button"]');

   //If it's not logged
   if (login !== null) {
       //Fill the field with the webId
       await expect(page).toFill('input[name="idp"]', webID);
       await page.click('[type="submit"]');
 
       //Wait until user & password screen shows up
       await page.waitForSelector('input[name="username"]');

       //Fill user & password fields with our credential
       await expect(page).toFill('input[name="username"]', user);
       await expect(page).toFill('input[name="password"]', password);
       await page.click('[id="login"]');
 
       //Wait until the nav-bar shows up
       await page.waitForSelector('img[alt="Viade 2b"]');
   } 

   //If it's logged
   else {
      //Wait until the nav-bar shows up
       await page.waitForSelector('img[alt="Viade 2b"]');
   }
});


//Test: View friends and groups list
defineFeature(feature, testViewFriendsGroups => {
    testViewFriendsGroups('John wants to view his friends and groups of friends', ({ given, when, then }) => {
        
        given('John has logged into the application without problems', () => {
            //cleanBrowserAndLogIn() treats this part
        });

        when('John clicks on the friends tab and creates a group', async () => {
            await page.goto(url + "/#/friends", {waitUntil: 'load', timeout: 0});

            await wait(3000);

            await page.waitForSelector('h3[name="friends"]');
            await page.waitForSelector('h3[name="groups"]');

            await page.waitForSelector('a[id="name_friend"]');

            await page.waitForSelector('button[name="group_button"]');
            await page.click('button[name="group_button"]');

            await wait(6000);

             //Fill name field
             await page.waitForSelector('input[name="name"]');
             await expect(page).toFill('input[name="name"]', "New group for test");

             //Click on submit (without friends)
             await page.waitForSelector('button[name="submit_button"]');
             await page.click('button[name="submit_button"]');

             await wait(6000);
        });    

        then('John can view his friend and the new group', async() => {
            //check he can view this frien
            await page.waitForSelector('a[id="name_friend"]');

            await page.waitForSelector('h4[id="New group for test"]');
        });
    });
});