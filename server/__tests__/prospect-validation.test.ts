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

describe("notes field validation", () => {
  test("accepts a prospect with no notes field", () => {
    const result = validateProspect({
      companyName: "Stripe",
      roleTitle: "Backend Engineer",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a prospect with null notes", () => {
    const result = validateProspect({
      companyName: "Stripe",
      roleTitle: "Backend Engineer",
      notes: null,
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a prospect with an empty string for notes", () => {
    const result = validateProspect({
      companyName: "Stripe",
      roleTitle: "Backend Engineer",
      notes: "",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a short single-line note", () => {
    const result = validateProspect({
      companyName: "Stripe",
      roleTitle: "Backend Engineer",
      notes: "Spoke to recruiter on Monday.",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a long multi-line note", () => {
    const result = validateProspect({
      companyName: "Stripe",
      roleTitle: "Backend Engineer",
      notes: "Round 1: phone screen with HR.\nRound 2: technical with two engineers.\nRound 3: system design with staff engineer.\nFeel good about it — follow up next week.",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts notes alongside all other optional fields", () => {
    const result = validateProspect({
      companyName: "Stripe",
      roleTitle: "Backend Engineer",
      status: "Interviewing",
      interestLevel: "High",
      salary: "$150,000",
      notes: "Great culture fit. Ask about remote policy.",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
