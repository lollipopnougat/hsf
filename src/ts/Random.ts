export default class Random {
    public static random(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
}