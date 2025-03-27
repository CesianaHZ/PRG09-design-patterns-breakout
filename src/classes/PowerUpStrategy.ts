import { Paddle } from "./paddle";

export interface PowerUpStrategy {
    applyEffect(paddle: Paddle): void;
}
