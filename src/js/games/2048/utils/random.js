export const RANDOM_THRESHOLD = 0.7;
export const RANDOM_VALUE_1 = 2;
export const RANDOM_VALUE_2 = 4;

export function getRandomInt(n) {
    return Math.floor(Math.random() * (n + 1));
}

export function getRandomNumber() {
    return Math.random() > RANDOM_THRESHOLD ? RANDOM_VALUE_2 : RANDOM_VALUE_1;
}
