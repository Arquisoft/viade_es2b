const puppeteer = require('puppeteer');
const expectPuppeteer = require('expect-puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./cucumber/features/routes/create.feature');
const feature2 = loadFeature('./cucumber/features/routes/edit.feature');
const feature3 = loadFeature('./cucumber/features/routes/delete.feature');

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


//Test: Create a route
defineFeature(feature, testAddRoute => {
	jest.setTimeout(3000000);
    testAddRoute('John wants to create a route', ({ given, when, then }) => {
        
        given('John has logged into the application without problems', () => {
            //cleanBrowserAndLogIn() treats this part
        });

        when('John creates a public route with name and description, but with no images and gpx file', async () => {

            //Click on "Add a route" button
            await page.waitForSelector('button[name="add_route"]');
            await page.click('button[name="add_route"]');

            //Wait for it 2 seconds
            await wait(3000);

            //Fill name field
            await page.waitForSelector('input[name="name"]');
            await expect(page).toFill('input[name="name"]', "Test Route2");

            //Fill description field
            await page.waitForSelector('input[name="description"]');
            await expect(page).toFill('input[name="description"]', "Description for a simple route");

            //Choose public route, clicking on the switcher
            await page.waitForSelector('input[name="priv"]');
            await page.click('input[name="priv"]');

            //Submit the route
            await page.click('button[name="submit_button"]');

            //Wait for reload page around 6 seconds
            await wait(6000);
        });

        then('John can click and view his route on the feed tab, on public routes', async() => {
			//Click the route name on the feed
            await page.waitForSelector('div[name="Test Route2"]');
			await page.click('div[name="Test Route2"]');
			
			//Wait for it 3 seconds
			await wait(6000);
			
			//Check if it's seeing description of the route
			await page.waitForSelector('p[id="Description for a simple route"]');
			await expect(page).toMatchElement('p[id="Description for a simple route"]');
        });
    });
});

//Test: Edit a route
defineFeature(feature2, testEditRoute => {
	jest.setTimeout(3000000);
    testEditRoute('John wants to edit a route', ({ given, when, then }) => {
        
        given('John has logged into the application without problems', () => {
            //cleanBrowserAndLogIn() treats this part
        });

        when('John edit a public route with name and description, but with no images and gpx file', async () => {

			//Click on delete route button deleting the new route we added before
            await page.waitForSelector('button[name="edit_Test Route2"]');
            await page.click('button[name="edit_Test Route2"]');

            //Wait for it 3 seconds
            await wait(3000);

            //Fill name field
            await page.waitForSelector('input[name="name"]');
            await expect(page).toFill('input[name="name"]', "Test Route2 Edited");

            //Fill description field
            await page.waitForSelector('input[name="description"]');
            await expect(page).toFill('input[name="description"]', "New description for a simple route");

            //Choose public route, clicking on the switcher
            await page.waitForSelector('input[name="priv"]');
            await page.click('input[name="priv"]');

            //Submit the route
            await page.click('button[name="submitEdit"]');

            //Wait for reload page around 6 seconds
            await wait(6000);
        });

        then('John can click and view his route edited on the feed tab, on public routes', async() => {
			//Click the route name on the feed
            await page.waitForSelector('div[name="Test Route2 Edited"]');
			await page.click('div[name="Test Route2 Edited"]');
			
			//Wait for it 3 seconds
			await wait(6000);
			
			//Check if it's seeing description of the route
			await page.waitForSelector('p[id="New description for a simple route"]');
			await expect(page).toMatchElement('p[id="New description for a simple route"]');
        });
    });
});

//Test: Delete a route
defineFeature(feature3, testDeleteRoute => {
	jest.setTimeout(3000000);
    testDeleteRoute('John wants to delete a route', ({ given, when, then }) => {
        
        given('John has logged into the application without problems', () => {
            //cleanBrowserAndLogIn() treats this part
        });

        when('John delete a public route with name and description, but with no images and gpx file', async () => {
			
			//Click on delete route button deleting the new route we added before
            await page.waitForSelector('button[name="delete_Test Route2 Edited"]');
            await page.click('button[name="delete_Test Route2 Edited"]');

            //Wait for reload page around 6 seconds
            await wait(6000);
        });

        then('John cant click and view his route on the feed tab, on public routes', async() => {
			
			var routeAppears = null;
			try {
				routeAppears = await page.waitForSelector('div[name="Test Route2 Edited"]');
			}
			catch (error) {
				// If everything worked fine, an error should be produced (the route doesn't exist anymore)
			}
			
			if (routeAppears !== null) {
				throw new Error("The route still exists");
			}
        });
    });
});


