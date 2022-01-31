export default class Random {
    public static random(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    public static randint(min: number = 0, max: number = 1): number {
        let range = max - min;
        let ranValue = min + Math.round(Math.random() * range);
        return ranValue;
    }


}