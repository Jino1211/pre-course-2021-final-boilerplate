const puppeteer = require("puppeteer");
const full4s = require("@suvelocity/tester");
const nock = require("nock");
const useNock = require("nock-puppeteer");

const path = "file://" + __dirname + "/src/index.html";
let page;
let browser;

const mockToDos = [
  {
    text: "first task input",
    priority: "1",
    date: new Date(),
  },
  {
    text: "second task input",
    priority: "4",
    date: new Date(),
  },
];
const metadata = { id: "nvkdf48sd85jfnbvhfd72nd0", private: true };
const mocks = {
  initBin: {
    record: {
      "my-todo": [],
    },
    metadata,
  },
  toDoAddResponse: {
    record: {
      "my-todo": mockToDos.slice(0, 1),
    },
    metadata,
  },
  toDoAddSecondResponse: {
    record: {
      "my-todo": mockToDos,
    },
    metadata,
  },
  fetchTest: {
    record: {
      "my-todo": [
        {
          text: `only fetch will pass me haha magic number: ${Math.floor(
            Math.random() * 1000000
          )}`,
          priority: "1",
          date: new Date(),
        },
      ],
      metadata,
    },
  },
};

const projectName = "pre.Todo App";

describe(projectName, () => {
    beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: false, // Uncomment me to see tests running in browser
        args: ["--disable-web-security"],
        slowMo: 35, // Uncomment and change me to slow down tests speed in browser.
      });
      page = await browser.newPage();
      useNock(page, ["https://api.jsonbin.io/v3"]);
  
      await full4s.beforeAll();
    });
  
    afterEach(async () => {
      await full4s.afterEach(page);
    });
  
    afterAll(async () => {
      await full4s.afterAll(projectName);
      await browser.close();
    });

    const app = 'file:///C:/Users/User/Desktop/final-pre-course/pre-course-2021-final-boilerplate/src/index.html';
test('Delete', async () => {
    await page.goto(app);
    
    await page.click('input#text-input')
    await page.type('input#text-input', 'Its my first test');
    await page.click('button#add-button');
   

    await page.click('button#restore');
    

    const elements = await page.$$(".todo-text");
    expect(elements.length).toBe(0);

}, 10000);
});