import { reduce } from "ramda";

/* Question 3 */

interface Ok<T> {
    tag: "Ok",
    value: T
};

interface Failure {
    tag: "Failure",
    message: string
};

export type Result<T> = Ok<T> | Failure;

export const makeOk = <T>(val: T): Ok<T> => {
    return {tag: "Ok", value: val}
};

export const makeFailure = (msg: string): Failure => {
    return {tag: "Failure", message: msg}
};

export const isOk = <T>(x: Result<T>): x is Ok<T> => x.tag === "Ok";

export const isFailure = <T>(x: Result<T>): x is Failure => x.tag === "Failure";

/* Question 4 */
export const bind = <T, U>(result: Result<T>, f: (x: T) => Result<U>): Result<U> => {
    return isFailure(result) ? makeFailure(result.message)
                             : f(result.value)
};

/* Question 5 */
interface User {
    name: string;
    email: string;
    handle: string;
}

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

export const naiveValidateUser = (user: User): Result<User> => {
    return isFailure(validateName(user)) ? validateName(user) :
           isFailure(validateEmail(user)) ? validateEmail(user) :
           isFailure(validateHandle(user)) ? validateHandle(user) :
           makeOk(user);
}

/* Question 6 */

export const monadicValidateUser = (user: User): Result<User> => {
    return reduce(bind, validateName(user), [validateEmail, validateHandle]);
}