import { validateProspect } from "../prospect-helpers";

describe("prospect creation validation", () => {
  test("rejects a blank company name", () => {
    const result = validateProspect({
      companyName: "",
      roleTitle: "Software Engineer",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Company name is required");
  });

  test("rejects a blank role title", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Role title is required");
  });
});

describe("salary field validation", () => {
  test("accepts a prospect with no salary field", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a prospect with a null salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      salary: null,
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a dollar amount format", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      salary: "$120,000",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a plain number format", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      salary: "120000",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a salary range format", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      salary: "$100,000 - $140,000",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts an empty string salary (treated as not provided)", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      salary: "",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
