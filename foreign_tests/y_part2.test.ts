import { expect } from "chai";
import { partition, mapMat, composeMany, maxSpeed, grassTypes,uniqueTypes} from "../src/part2/part2";

describe("Assignment 1 Part 2", () => {
    describe("partirion", ()=>{
        it("seperate even and odd numbers", ()=> {
            const numbers =[1, 2, 3, 4, 5, 6, 7, 8, 9];
            expect(partition(x => x % 2 === 0, numbers)).to.deep.equal([[2, 4, 6, 8], [1, 3, 5, 7, 9]]);
        })
    })

    describe("mapMat", () =>{
        it("square all elements", () => {
            const mat = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
                ]
            expect(mapMat(x=>x**2,mat)).to.deep.equal([[ 1, 4, 9 ], [ 16, 25, 36 ], [ 49, 64, 81 ]])
        })
    })

    describe("composeMany", () => {
        it("compose *8 by three multiple *2", () => {
            const times8 = composeMany([(x:number)=> x*2 ,(x:number)=> x*2,(x:number)=> x*2]);
            expect(times8(3)).to.equal(24);            
        })
        it("compose (2x+1)^2", () => {
            let wf = composeMany([(x: number) => x * x, (x: number) => x + 1, (x: number) => 2 * x]);
            expect(wf(4)).to.equal(81);
          })
          it("compose (2(x+1))^2", () => {
            let wf = composeMany([(x: number) => x * x, (x: number) => x * 2, (x: number) => x + 1]);
            expect(wf(4)).to.equal(100);
          })
    })
});
