export default class Utils {
    static objectIsEmpty(obj: {}) {
        return Object.keys(obj).length === 0;
    }

    static generateId(): number {
        return Math.floor(Math.random() * Date.now());
    }

    static roundNumber(number: number) {
        return Math.round(number).toFixed(2);
    }

    static getJwtTokenData(token: string) {
        return JSON.parse(atob(token.split(".")[1]));
    }
}