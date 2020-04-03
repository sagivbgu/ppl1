import { expect } from "chai";
import { partition, maxSpeed, grassTypes, uniqueTypes } from "../src/part2/part2";
import { pokedex as fullPokedex } from "./test_pokedex";

const partialPokedex = [{ "id": 15, "name": { "english": "NOAME", "japanese": "NOAMJ", "chinese": "NOAMC", "french": "NOAMF" }, "type": ["Grass", "Fire"], "base": { "HP": 97, "Attack": 99, "Defense": 95, "Sp. Attack": 67, "Sp. Defense": 87, "Speed": 105 } },
{ "id": 17, "name": { "english": "ALONE", "japanese": "ALONJ", "chinese": "ALONC", "french": "ALONF" }, "type": ["Water", "Fire"], "base": { "HP": 97, "Attack": 99, "Defense": 95, "Sp. Attack": 67, "Sp. Defense": 87, "Speed": 56 } },
{ "id": 16, "name": { "english": "AVIE", "japanese": "AVIJ", "chinese": "AVIC", "french": "AVIF" }, "type": [], "base": { "HP": 97, "Attack": 99, "Defense": 95, "Sp. Attack": 67, "Sp. Defense": 87, "Speed": 105 } },
{ "id": 15, "name": { "english": "TOMERE", "japanese": "TOMERJ", "chinese": "TOMERC", "french": "TOMERF" }, "type": ["Grass"], "base": { "HP": 97, "Attack": 99, "Defense": 95, "Sp. Attack": 67, "Sp. Defense": 87, "Speed": 80 } }];

describe("Assignment 1 Part 2", () => {
    it("partition extracts even numbers", () => {
        const isEven: (n: number) => boolean = n => n % 2 === 0;
        const wholeList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const evens = [2, 4, 6, 8];
        const odds = [1, 3, 5, 7, 9];
        expect(partition(isEven, wholeList)).to.deep.equal([evens, odds]);
    });

    it("partition extracts strings with 's'", () => {
        const containsS: (str: string) => boolean = str => str.includes("s");
        const words = ["No no", "Yes yes", "AB", "AC", "AsDF"];
        const withS = ["Yes yes", "AsDF"];
        const withoutS = ["No no", "AB", "AC"];
        expect(partition(containsS, words)).to.deep.equal([withS, withoutS]);
    });

    it("maxSpeed empty pokedex", () => {
        expect(maxSpeed([])).to.deep.equal([]);
    });

    it("maxSpeed partial pokedex", () => {
        expect(maxSpeed(partialPokedex)).to.deep.equal([{ "id": 15, "name": { "english": "NOAME", "japanese": "NOAMJ", "chinese": "NOAMC", "french": "NOAMF" }, "type": ["Grass", "Fire"], "base": { "HP": 97, "Attack": 99, "Defense": 95, "Sp. Attack": 67, "Sp. Defense": 87, "Speed": 105 } },
        { "id": 16, "name": { "english": "AVIE", "japanese": "AVIJ", "chinese": "AVIC", "french": "AVIF" }, "type": [], "base": { "HP": 97, "Attack": 99, "Defense": 95, "Sp. Attack": 67, "Sp. Defense": 87, "Speed": 105 } }]);
    });

    it("maxSpeed full pokedex", () => {
        expect(maxSpeed(fullPokedex)).to.deep.equal([
            {
                id: 6,
                name: {
                    english: 'Charizard',
                    japanese: 'リザードン',
                    chinese: '喷火龙',
                    french: 'Dracaufeu'
                },
                type: ['Fire', 'Flying'],
                base: {
                    HP: 78,
                    Attack: 84,
                    Defense: 78,
                    'Sp. Attack': 109,
                    'Sp. Defense': 85,
                    Speed: 100
                }
            },
            {
                id: 8,
                name: {
                    english: 'Wartortle',
                    japanese: 'カメール',
                    chinese: '卡咪龟',
                    french: 'Carabaffe'
                },
                type: ['Water'],
                base: {
                    HP: 59,
                    Attack: 63,
                    Defense: 80,
                    'Sp. Attack': 65,
                    'Sp. Defense': 80,
                    Speed: 100
                }
            }
        ]);
    });

    it("grassType empty pokedex", () => {
        expect(grassTypes([])).to.deep.equal([]);
    });

    it("grassType partial pokedex", () => {
        expect(grassTypes(partialPokedex)).to.deep.equal(["NOAME", "TOMERE"]);
    });

    it("grassType full pokedex", () => {
        expect(grassTypes(fullPokedex)).to.deep.equal(['Bulbasaur', 'Ivysaur', 'Venusaur']);
    });

    it("uniqueTypes empty pokedex", () => {
        expect(uniqueTypes([])).to.deep.equal([]);
    });

    it("uniqueTypes partial pokedex", () => {
        expect(uniqueTypes(partialPokedex)).to.deep.equal(["Fire", "Grass", "Water"]);
    });

    it("uniqueTypes full pokedex", () => {
        expect(uniqueTypes(fullPokedex)).to.deep.equal(["Bug", "Fire", "Flying", "Grass", "Normal", "Poison", "Water"]);
    });
});
