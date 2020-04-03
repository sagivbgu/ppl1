import { expect } from "chai";
import {Optional} from "C:/Users/noama/Desktop/ppl/Assignment1/src/part3/optional";
import {makeSome} from "C:/Users/noama/Desktop/ppl/Assignment1/src/part3/optional";
import {makeNone} from "C:/Users/noama/Desktop/ppl/Assignment1/src/part3/optional";
import {isSome} from "C:/Users/noama/Desktop/ppl/Assignment1/src/part3/optional";
import {isNone} from "C:/Users/noama/Desktop/ppl/Assignment1/src/part3/optional";
// import {bind} from "C:/Users/noama/Desktop/ppl/Assignment1/src/part3/optional";
import {Result, naiveValidateUser, monadicValidateUser} from "C:/Users/noama/Desktop/ppl/Assignment1/src/part3/result";
import {makeOk} from "C:/Users/noama/Desktop/ppl/Assignment1/src/part3/result";
import {makeFailure} from "C:/Users/noama/Desktop/ppl/Assignment1/src/part3/result";
import {isOk} from "C:/Users/noama/Desktop/ppl/Assignment1/src/part3/result";
import {isFailure} from "C:/Users/noama/Desktop/ppl/Assignment1/src/part3/result";
import {bind} from "C:/Users/noama/Desktop/ppl/Assignment1/src/part3/result";



const square = (x: number): Optional<number> => makeSome(x*x);
const half = (x: number): Optional<number> => makeSome(x/2);
const divideTenByMe = (x:number): Optional<number> => x===0? makeNone() : makeSome(10/x);
const numToString = (x: number): Optional<string> => x%2==0? makeSome("even") : makeSome("odd");
const f1 = (x: User): Result<User> => makeOk({name: x.name, email: x.email, handle: "ABC"});
const f2 = (x: User): Result<string> => makeOk("Adler is the king!");
const validateName = (user: User): Result<User> =>
    user.name.length === 0 ? makeFailure("Name cannot be empty") :
    user.name === "Bananas" ? makeFailure("Bananas is not a name") :
    makeOk(user);

const validateEmail = (user: User): Result<User> =>
    user.email.length === 0 ? makeFailure("Email cannot be empty") :
    user.email.endsWith("bananas.com") ? makeFailure("Domain bananas.com is not allowed") :
    makeOk(user);

const validateHandle = (user: User): Result<User> =>
    user.handle.length === 0 ? makeFailure("Handle cannot be empty") :
    user.handle.startsWith("@") ? makeFailure("This isn't Twitter") :
    makeOk(user);

interface User {
    name: string;
    email: string;
    handle: string;
}

describe("Assignment 1 Part 3", () => {
    it("makeSome1", () => {
        expect (makeSome(10)).to.deep.equal({tag: "Some", value: 10})
    });
    it("makeSome2", () => {
        expect (makeSome("Alon")).to.deep.equal({tag: "Some", value: "Alon"})
    });
    it("makeNone", () => {
        expect (makeNone()).to.deep.equal({tag: "None"})
    });
    it("isSome1", () => {
        expect (isSome({tag: "Some", value: "Alon"})).to.deep.equal(true)
    });
    it("isSome2", () => {
        expect (isSome({tag: "None"})).to.deep.equal(false)
    });
    it("isSome3", () => {
        expect (isSome(10)).to.deep.equal(false)
    });
    it("isNone1", () => {
        expect (isNone({tag: "None"})).to.deep.equal(true)
    });
    it("isNone2", () => {
        expect (isNone({tag: "Some", value: "Alon"})).to.deep.equal(false)
    });
    it("isNone3", () => {
        expect (isNone(10)).to.deep.equal(false)
    });
    // it("OptionalBind1",()=>{
    //     expect (bind(makeSome(10),square)).to.deep.equal({tag:"Some", value:100})
    // });
    // it("OptionalBind2",()=>{
    //     expect (bind(makeSome(10),divideTenByMe)).to.deep.equal({tag:"Some", value:1})
    // });
    // it("OptionalBind3",()=>{
    //     expect (bind(makeSome(0),divideTenByMe)).to.deep.equal({tag:"None"})
    // });
    // it("OptionalBind4",()=>{
    //     expect (bind(makeNone(),half)).to.deep.equal({tag:"None"})
    // });
    // it("OptionalBind5",()=>{
    //     expect (bind(makeSome(4),numToString)).to.deep.equal({tag:"Some", value:"even"})
    // });
    // it("OptionalBind6",()=>{
    //     expect (bind(makeSome(5),numToString)).to.deep.equal({tag:"Some", value:"odd"})
    // });
    it("makeOk", ()=> {
        expect (makeOk(5)).to.deep.equal({tag: "Ok", value: 5})
    });
    it("makeFailure", ()=> {
        expect (makeFailure("Failed")).to.deep.equal({tag: "Failure", message: "Failed"})
    });
    it("isOk1", ()=> {
        expect (isOk({tag:"Ok", value: 3})).to.deep.equal(true)
    });
    it("isOk2", ()=> {
        expect (isOk({tag:"Failure", message: "failed"})).to.deep.equal(false)
    });
    it("isOk3", ()=> {
        expect (isOk("check")).to.deep.equal(false)
    });
    it("isFailure1", ()=> {
        expect (isFailure({tag: "Failure", message: "failed"})).to.deep.equal(true)
    });
    it("isFailure2", ()=> {
        expect (isFailure({tag:"Ok", value: 3})).to.deep.equal(false)
    });
    it("isFailure3", ()=> {
        expect (isFailure([1, 2])).to.deep.equal(false)
    });
    it("ResultBind1",()=>{
        expect (bind({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "abc"}},f1)).to.deep.equal({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "ABC"}})
    });
    it("ResultBind2",()=>{
        expect (bind({tag:"Failure", message: "FAILED"},f1)).to.deep.equal({tag:"Failure", message: "FAILED"})
    });
    it("ResultBind3",()=>{
        expect (bind({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "abc"}},f2)).to.deep.equal({tag:"Ok", value: "Adler is the king!"})
    });
    it("ResultBind4",()=>{
        expect (bind({tag:"Ok", value: {name: "", email: "noam@gmail.com", handle: "abc"}},validateName)).to.deep.equal({tag:"Failure", message: "Name cannot be empty"})
    });
    it("ResultBind5",()=>{
        expect (bind({tag:"Ok", value: {name: "Bananas", email: "noam@gmail.com", handle: "abc"}},validateName)).to.deep.equal({tag:"Failure", message: "Bananas is not a name"})
    });
    it("ResultBind6",()=>{
        expect (bind({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "abc"}},validateName)).to.deep.equal({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "abc"}})
    });
    it("ResultBind7",()=>{
        expect (bind({tag:"Ok", value: {name: "noam", email: "noam@bananas.com", handle: "abc"}},validateEmail)).to.deep.equal({tag:"Failure", message: "Domain bananas.com is not allowed"})
    });
    it("ResultBind8",()=>{
        expect (bind({tag:"Ok", value: {name: "", email: "noam@gmail.com", handle: "abc"}},validateEmail)).to.deep.equal({tag:"Ok", value: {name: "", email: "noam@gmail.com", handle: "abc"}})
    });
    it("ResultBind9",()=>{
        expect (bind({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "@abc"}},validateHandle)).to.deep.equal({tag:"Failure", message: "This isn't Twitter"})
    });
    it("ResultBind10",()=>{
        expect (bind({tag:"Ok", value: {name: "noam", email: "noam@bananas.com", handle: "abc"}},validateHandle)).to.deep.equal({tag:"Ok", value: {name: "noam", email: "noam@bananas.com", handle: "abc"}})
    });
    it("ResultBind11",()=>{
        expect (naiveValidateUser({name: "noam", email: "noam@gmail.com", handle: "abc"})).to.deep.equal({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "abc"}})
    });
    it("ResultBind12",()=>{
        expect (naiveValidateUser({name: "Bananas", email: "noam@gmail.com", handle: "abc"})).to.deep.equal({tag:"Failure", message: "Bananas is not a name"})
    });
    it("ResultBind13",()=>{
        expect (naiveValidateUser({name: "noam", email: "", handle: "abc"})).to.deep.equal({tag:"Failure", message: "Email cannot be empty"})
    });
    it("ResultBind14",()=>{
        expect (naiveValidateUser({name: "noam", email: "noam@gmail.com", handle: "@abc"})).to.deep.equal({tag:"Failure", message: "This isn't Twitter"})
    });
    it("ResultBind15",()=>{
        expect (monadicValidateUser({name: "noam", email: "noam@gmail.com", handle: "abc"})).to.deep.equal({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "abc"}})
    });
    it("ResultBind16",()=>{
        expect (monadicValidateUser({name: "Bananas", email: "noam@gmail.com", handle: "abc"})).to.deep.equal({tag:"Failure", message: "Bananas is not a name"})
    });
    it("ResultBind17",()=>{
        expect (monadicValidateUser({name: "noam", email: "", handle: "abc"})).to.deep.equal({tag:"Failure", message: "Email cannot be empty"})
    });
    it("ResultBind18",()=>{
        expect (monadicValidateUser({name: "noam", email: "noam@gmail.com", handle: "@abc"})).to.deep.equal({tag:"Failure", message: "This isn't Twitter"})
    });






});