const expect = require("expect-puppeteer");
const puppeteer = require("puppeteer");
const { defineFeat, loadFeat } = require("jest-cucumber");
const feature = loadFeature("./e2e/features/routes/create.feature");

var port = 3000;
var url = "http://localhost:" + port;
var webId = "https://diegofs29.solid.community/profile/card#me";
var username = "";
var password = "";

