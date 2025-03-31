import { FrozenMovement, NormalMovement } from "./MovementStrategies";
import { Paddle } from "./paddle";
import { PowerUpStrategy } from "./PowerUpStrategy";

export class Freeze implements PowerUpStrategy {
    applyEffect(paddle: Paddle) {
        console.log("Freeze Activated!");
        paddle.setMovementStrategy(new FrozenMovement());
        setTimeout(() => paddle.setMovementStrategy(new NormalMovement()), 5000);
    }
}
