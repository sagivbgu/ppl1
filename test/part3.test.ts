import { expect } from "chai";
import { isNone, makeNone, isSome, makeSome, Optional, bind } from "../src/part3/optional";

const safeDiv = (x: number, y: number): Optional<number> =>
    y === 0 ? makeNone() : makeSome(x / y);
const div10 = (y: number): Optional<number> =>
    y === 0 ? makeNone() : makeSome(10 / y);

describe("Assignment 1 Part 3", () => {
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
});