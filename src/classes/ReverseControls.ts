import { NormalMovement, ReverseMovement } from "./MovementStrategies";
import { Paddle } from "./paddle";
import { PowerUpStrategy } from "./PowerUpStrategy";

export class ReverseControls implements PowerUpStrategy {
    applyEffect(paddle: Paddle) {
        console.log("Reverse Controls Activated!");
        paddle.setMovementStrategy(new ReverseMovement());
        setTimeout(() => paddle.setMovementStrategy(new NormalMovement()), 5000);
    }
}