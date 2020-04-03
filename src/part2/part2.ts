import { chain, uniq } from "ramda";

const GRASS_TYPE_NAME = "Grass";

/* Question 1 */
export const partition: <T>(pred: (item: T) => boolean, arr: T[]) => T[][] = (pred, arr) =>
    [arr.filter(elem => pred(elem)), arr.filter(elem => !pred(elem))];

/* Question 2 */
export const mapMat = undefined;

/* Question 3 */
export const composeMany = undefined;

/* Question 4 */
interface Languages {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
}

interface Stats {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
}

interface Pokemon {
    id: number;
    name: Languages;
    type: string[];
    base: Stats;
}

export const maxSpeed: (pokedex: Pokemon[]) => Pokemon[] = pokedex =>
    pokedex.reduce((acc: Pokemon[], cur: Pokemon): Pokemon[] =>
        acc.length === 0 ? [cur] :
            cur.base.Speed > acc[0].base.Speed ? [cur] :
                cur.base.Speed === acc[0].base.Speed ? acc.concat(cur) :
                    acc
        , []);


export const grassTypes: (pokedex: Pokemon[]) => string[] = pokedex =>
    pokedex.filter(pokemon => pokemon.type.includes(GRASS_TYPE_NAME))
        .map(pokemon => pokemon.name.english)
        .sort();

export const uniqueTypes: (pokedex: Pokemon[]) => string[] = pokedex =>
    uniq(chain((pokemon => pokemon.type), pokedex)).sort();
