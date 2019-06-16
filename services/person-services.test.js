const PersonServices = require("./person-services");
const People = require("../models/person");
const bcrypt = require("bcrypt");
jest.mock("bcrypt");

describe("Test person services", () => {
  describe("Test createPerson method", () => {
    it("Should throw error if person is undefined", async () => {
      expect(PersonServices.createPerson()).rejects.toThrowError(
        /cannot be empty/
      );
    });

    it("Should throw error if person is null", async () => {
      expect(PersonServices.createPerson(null)).rejects.toThrowError(
        /cannot be empty/
      );
    });

    it("Should throw error if person is {}", async () => {
      expect(PersonServices.createPerson({})).rejects.toThrowError(/username/);
    });

    it("Should throw error if person is missing username field", async () => {
      let person = {
        username: "",
        password: "hsajdkfh",
        name: "Hello"
      };
      PersonServices.validatePerson = jest
        .fn()
        .mockRejectedValue(new Error("username"));
      expect(PersonServices.createPerson(person)).rejects.toThrowError(
        /username/
      );
    });

    it("Should throw error if person is missing password field", async () => {
      let person = {
        username: "hello",
        password: "",
        name: "Hello"
      };
      PersonServices.validatePerson = jest
        .fn()
        .mockRejectedValue(new Error("password"));
      expect(PersonServices.createPerson(person)).rejects.toThrowError(
        /password/
      );
    });

    it("Should throw error if person is missing name field", async () => {
      let person = {
        username: "hello",
        password: "hsajdkfh",
        name: ""
      };
      PersonServices.validatePerson = jest
        .fn()
        .mockRejectedValue(new Error("name"));
      expect(PersonServices.createPerson(person)).rejects.toThrowError(/name/);
    });

    it("Should throw error when cannot save person", async () => {
      let person = {
        username: "hello",
        password: "hsajdkfh",
        name: "hello"
      };
      PersonServices.validatePerson = jest.fn().mockResolvedValue({});
      bcrypt.hash = jest.fn().mockResolvedValue("asldkjklfsjd");
      People.save = jest.fn().mockRejectedValue(new Error("cannot save"));
      expect(PersonServices.createPerson(person)).rejects.toThrowError(
        /cannot save/
      );
    });

    it("Should return created person with hashed password", async () => {
      let person = {
        username: "hello",
        password: "hsajdkfh",
        name: "hello"
      };
      PersonServices.validatePerson = jest.fn().mockResolvedValue({});
      let hashedPass = "asldkjklfsjd";
      bcrypt.hash = jest.fn().mockResolvedValue(hashedPass);
      let savedPerson = {
        ...person,
        password: hashedPass
      };
      People.save = jest.fn().mockResolvedValue(savedPerson);
      expect(PersonServices.createPerson(person)).resolves.toHaveProperty(
        "password",
        hashedPass
      );
    });
  });
});
