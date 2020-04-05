import { expect } from "chai";
import { monadicValidateUser, naiveValidateUser } from "../src/part3/result";

const user1 = { name: "Ben", email: "bene@post.bgu.ac.il", handle: "bene" };
const user2 = { name: "Bananas", email: "me@bananas.com", handle: "bene" };
const user3 = { name: "yuval", email: "me@bananas.com", handle: "bene" };
const user4 = { name: "yuval", email: "me@bananas.com", handle: "" };
const user5 = { name: "yuval", email: "me@gmail.com", handle: "" };
const user6 = { name: "yuval", email: "me@gmail.com", handle: "@jubelsM" };

describe("monadic validate user", () => {
    it("validates user data with bind", () => {
        expect(monadicValidateUser(user1)).to.deep.equal({
            tag: 'Ok',
            value: {
                name: 'Ben',
                email: 'bene@post.bgu.ac.il',
                handle: 'bene'
            }
        })
    })

    it("validates user data with bind", () => {
        expect(monadicValidateUser(user2)).to.deep.equal({
            tag: 'Failure',
            message: 'Bananas is not a name'
        })
    })
    it("validates user data with bind", () => {
        expect(monadicValidateUser(user3)).to.deep.equal({
            tag: 'Failure',
            message: "Domain bananas.com is not allowed"
        })
    })
    it("validates user data with bind", () => {
        expect(monadicValidateUser(user4)).to.deep.equal({
            tag: 'Failure',
            message: "Domain bananas.com is not allowed"
        })
    })
    it("validates user data with bind", () => {
        expect(monadicValidateUser(user5)).to.deep.equal({
            tag: 'Failure',
            message: "Handle cannot be empty"
        })
    })
    it("validates user data with bind", () => {
        expect(monadicValidateUser(user6)).to.deep.equal({
            tag: 'Failure',
            message: "This isn't Twitter"
        })
    })
})

describe("naive validate user", () => {
    it("validates user1 data  naively", () => {
        expect(naiveValidateUser(user1)).to.deep.equal({
            tag: 'Ok',
            value: {
                name: 'Ben',
                email: 'bene@post.bgu.ac.il',
                handle: 'bene'
            }
        })
    })

    it("validates user2 data naively", () => {
        expect(naiveValidateUser(user2)).to.deep.equal({
            tag: 'Failure',
            message: 'Bananas is not a name'
        })
    })

    it("validates user3 data naively", () => {
        expect(naiveValidateUser(user3)).to.deep.equal({
            tag: 'Failure',
            message: "Domain bananas.com is not allowed"
        })
    })
    it("validates user6 data naively", () => {
        expect(naiveValidateUser(user6)).to.deep.equal({
            tag: 'Failure',
            message: "This isn't Twitter"
        })
    })
});