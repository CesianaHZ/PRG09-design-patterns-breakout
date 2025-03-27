import { Paddle } from "./paddle";
import { PowerUp } from "./PowerUp";

export class SpeedBoost extends PowerUp {
    constructor(x: number, y: number) {
        super(x, y, "blue");
    }

    protected activateEffect(paddle: Paddle) {
        paddle.setSpeed(paddle.getSpeed() * 2);
        setTimeout(() => paddle.setSpeed(paddle.getSpeed() / 2), 3000);
    }
}

export class Freeze extends PowerUp {
    constructor(x: number, y: number) {
        super(x, y, "red");
    }

    protected activateEffect(paddle: Paddle) {
        paddle.setSpeed(0);
        setTimeout(() => paddle.setSpeed(7), 3000);
    }
}
