import { NormalMovement, SpeedBoostMovement } from "./MovementStrategies";
import { Paddle } from "./paddle";
import { PowerUpStrategy } from "./PowerUpStrategy";

export class SpeedBoost implements PowerUpStrategy {
    applyEffect(paddle: Paddle) {
        console.log("Speed Boost Activated!");
        paddle.setMovementStrategy(new SpeedBoostMovement());
        setTimeout(() => paddle.setMovementStrategy(new NormalMovement()), 5000);
    }
}