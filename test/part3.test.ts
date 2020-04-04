import { expect } from "chai";
import { isNone, makeNone, isSome, makeSome, Optional, bind } from "../src/part3/optional";
import { isOk, makeOk, isFailure, makeFailure, Result, bind as ResultBind } from "../src/part3/result";

// For Optional<T> tests
const safeDiv = (x: number, y: number): Optional<number> =>
    y === 0 ? makeNone() : makeSome(x / y);
const div10 = (y: number): Optional<number> =>
    y === 0 ? makeNone() : makeSome(10 / y);

// For Result<T> tests
interface User {
    name: string;
    email: string;
    handle: string;
    }

const validateName = (user: User): Result<User> =>
user.name.length === 0 ? makeFailure("Name cannot be blank.") :
user.name === "Bananas" ? makeFailure("Bananas is not a name.") :
makeOk(user);

const validateEmail = (user: User): Result<User> =>
user.email.length === 0 ? makeFailure("Email cannot be blank") :
user.email.search("@") === -1 ? makeFailure("Email is illegal") :
makeOk(user);

const user1 = { name: "Ben", email: "bene@post.bgu.ac.il", handle: "bene" };

const user2 = { name: "Bananas", email: "me@bananas.com", handle: "bene" };

const user3 = { name: "Yosi", email: "mebananas.com", handle: "bene" };

describe("Assignment 1 Part 3", () => {
    // Test Optional<T>
    
    it("makeSome1", () => {
        expect(makeSome(10)).to.deep.equal({ tag: "Some", value: 10 });
    });
    it("makeSome2", () => {
        expect(makeSome("Alon")).to.deep.equal({ tag: "Some", value: "Alon" });
    });
    it("makeNone", () => {
        expect(makeNone()).to.deep.equal({ tag: "None" });
    });
    it("isSome1", () => {
        expect(isSome({ tag: "Some", value: "Alon" })).to.deep.equal(true);
    });
    it("isSome2", () => {
        expect(isSome({ tag: "None" })).to.deep.equal(false);
    });
    it("isSome3", () => {
        expect(isSome({ tag: "Some", value: undefined })).to.deep.equal(true);
    });
    it("isNone1", () => {
        expect(isNone({ tag: "None" })).to.deep.equal(true)
    });
    it("isNone2", () => {
        expect(isNone({ tag: "Some", value: "Alon" })).to.deep.equal(false)
    });
    it("isNone3", () => {
        expect(isNone({ tag: "Some", value: undefined })).to.deep.equal(false);
    });

    it("none composes many functions", () => {
        expect(safeDiv(5, 0)).to.deep.equal({ tag: "None" });
    });
    it("some composes many functions", () => {
        expect(safeDiv(5, 2)).to.deep.equal({ tag: "Some", value: 2.5 });
    });

    it("bind composes many functions (none)", () => {
        expect(bind(safeDiv(5, 0), div10)).to.deep.equal({ tag: "None" });
    });

    it("bind composes many functions (second function returns none)", () => {
        expect(bind({ tag: "Some", value: 0 }, div10)).to.deep.equal({ tag: "None" });
    });

    it("bind composes many functions (some)", () => {
        expect(bind(safeDiv(5, 2), div10)).to.deep.equal({ tag: "Some", value: 4 });
    });

    it("checks type of None if is Some", () => {
        expect(isSome(safeDiv(5, 0))).to.equal(false);
    });

    it("checks type of Some if is Some", () => {
        expect(isSome(safeDiv(5, 2))).to.equal(true);
    });

    it("checks type of None if is None", () => {
        expect(isNone(safeDiv(5, 0))).to.equal(true);
    });

    it("checks type of Some if is None", () => {
        expect(isNone(safeDiv(5, 2))).to.equal(false);
    });

    // Test Result<T>

    it("makeOk1", () => {
        expect(makeOk(10)).to.deep.equal({ tag: "Ok", value: 10 });
    });
    it("makeOk2", () => {
        expect(makeOk("Alon")).to.deep.equal({ tag: "Ok", value: "Alon" });
    });
    it("makeFailure", () => {
        expect(makeFailure("Failed")).to.deep.equal({ tag: "Failure", message: "Failed" });
    });
    it("isOk1", () => {
        expect(isOk({ tag: "Ok", value: "Alon" })).to.deep.equal(true);
    });
    it("isOk2", () => {
        expect(isOk({ tag: "None" })).to.deep.equal(false);
    });
    it("isOk3", () => {
        expect(isOk({ tag: "Ok", value: undefined })).to.deep.equal(true);
    });
    it("isFailure", () => {
        expect(isFailure({ tag: "Failure" })).to.deep.equal(true)
    });
    it("isFailure2", () => {
        expect(isFailure({ tag: "Ok", value: "Alon" })).to.deep.equal(false)
    });
    it("isFailure3", () => {
        expect(isFailure({ tag: "Ok", value: undefined })).to.deep.equal(false);
    });
    it("validateName1 - check OK", () => {
        expect(isOk(validateName(user1))).to.deep.equal(true);
    });
    it("validateName1 - check Failure", () => {
        expect(isFailure(validateName(user1))).to.deep.equal(false);
    });
    it("validateName2 - check Ok", () => {
        expect(isOk(validateName(user2))).to.deep.equal(false);
    });
    it("validateName2 - check Failure", () => {
        expect(isFailure(validateName(user2))).to.deep.equal(true);
    });

    it("ResultBind composes two functions - returns Ok with user1", () => {
        expect(ResultBind(validateName(user1), validateEmail)).to.deep.equal(makeOk(user1));
    });

    it("ResultBind composes two functions - first returns Failure second eturns Failure", () => {
        expect(ResultBind(validateName(user2), validateEmail)).to.deep.equal(makeFailure
                                                            ("Tried to bind a value of type 'Failure'"));
    });
    it("ResultBind composes two functions - first returns Ok second returns Failure", () => {
        expect(ResultBind(validateName(user3), validateEmail)).to.deep.equal(makeFailure("Email is illegal"));
    });

  });