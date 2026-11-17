
import test from "node:test";
import assert from "node:assert/strict";

import {
  classifyOccupation,
  getOccupationCategories
} from "../dist/occupation-classifier.js";

test("classifies software engineers as technology", () => {
  const result = classifyOccupation("Software Engineer");

  assert.equal(result.category, "technology");
  assert.ok(result.matchedTerms.includes("software engineer"));
});

test("classifies registered nurses as healthcare", () => {
  const result = classifyOccupation("Registered Nurse");

  assert.equal(result.category, "healthcare");
});

test("classifies accountants as finance", () => {
  const result = classifyOccupation("Accountant");

  assert.equal(result.category, "finance");
});

test("classifies digital marketing managers correctly", () => {
  const result = classifyOccupation("Digital Marketing Manager");

  assert.equal(result.category, "marketing");
});

test("handles uppercase and extra spaces", () => {
  const result = classifyOccupation("  SOFTWARE ENGINEER  ");

  assert.equal(result.category, "technology");
});

test("returns other for an unknown occupation", () => {
  const result = classifyOccupation("Underwater Basket Designer");

  assert.equal(result.category, "other");
  assert.equal(result.confidence, 0);
});

test("provides an explanation for a successful match", () => {
  const result = classifyOccupation("Civil Engineer");

  assert.ok(result.explanation.length > 0);
});

test("rejects empty occupation titles", () => {
  assert.throws(
    () => classifyOccupation(""),
    /non-empty string/
  );
});

test("rejects whitespace-only occupation titles", () => {
  assert.throws(
    () => classifyOccupation("   "),
    /non-empty string/
  );
});

test("returns the supported occupation categories", () => {
  const categories = getOccupationCategories();

  assert.ok(categories.includes("technology"));
  assert.ok(categories.includes("healthcare"));
  assert.ok(categories.includes("finance"));
  assert.ok(categories.includes("other"));
});
