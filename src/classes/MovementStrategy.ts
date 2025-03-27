import { Paddle } from "./paddle";

export interface MovementStrategy {
    move(paddle: Paddle): void;
    
}
