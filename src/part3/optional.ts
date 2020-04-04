/* Question 1 */
interface Some<T> {
    tag: "Some",
    value: T
};

interface None {
    tag: "None"
};

export type Optional<T> = Some<T> | None;

export const makeSome = <T>(val: T): Some<T> => {
    return { tag: "Some", value: val }
};

export const makeNone = (): None => {
    return { tag: "None" }
};

// TODO: isn't it supposed to be x:any ?
export const isSome = <T>(x: Optional<T>): x is Some<T> => x.tag === "Some";
// TODO: isn't it supposed to be x:any ?
export const isNone = <T>(x: Optional<T>): x is None => x.tag === "None";

/* Question 2 */
export const bind = <T, U>(optional: Optional<T>, f: (x: T) => Optional<U>): Optional<U> => {
    return isNone(optional) ? makeNone() : f(optional.value);
}
