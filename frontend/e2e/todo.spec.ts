import { test, expect } from "./fixtures";

import { spaceToUnderscore } from "../src/lib/formatter";

const TODO_ITEMS = [
  "buy some cheese",
  "feed the cat",
  "book a doctors appointment",
  "buy some sausages",
];
const TODO_LIST = `todo-list`;

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3101/");
});

// test.afterEach(async ({ page }) => {
//   const toggles = await page.locator(".toggle").all();
//   await Promise.all(toggles.map((toggle) => toggle.click()));
// });

test.describe("New Todo", () => {
  test("should allow me to add todo items", async ({ page }) => {
    const newTodo = page.locator("#title");

    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");

    await expect(page.getByTestId(TODO_LIST)).toContainText([TODO_ITEMS[0]]);

    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");

    await expect(page.getByTestId(TODO_LIST)).toContainText([TODO_ITEMS[1]]);

    const toggles = await page.locator(".toggle").all();
    await Promise.all(toggles.map((toggle) => toggle.click()));
  });

  test("should clear text input field when an item is added", async ({
    page,
  }) => {
    const newTodo = page.locator("#title");

    await newTodo.fill(TODO_ITEMS[2]);
    await newTodo.press("Enter");

    await expect(newTodo).toBeEmpty();
  });

  test("should remove a todo item when click the remove button", async ({
    page,
  }) => {
    const newTodo = page.locator("#title");
    const dateString = String(Date.now());
    await newTodo.fill(dateString);
    await newTodo.press("Enter");

    await expect(page.getByTestId(TODO_LIST)).toContainText([dateString]);

    await page
      .locator(`#todo_${spaceToUnderscore(dateString)} .toggle`)
      .click();

    await expect(page.getByTestId(TODO_LIST)).not.toContainText([dateString]);
  });
});
