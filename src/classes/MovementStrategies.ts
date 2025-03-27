import { Paddle } from "./paddle";
import { MovementStrategy } from "./MovementStrategy";

export class NormalMovement implements MovementStrategy {
    move(paddle: Paddle): void {
        let newX = paddle.getX();
        if (paddle.isMovingLeft()) newX -= paddle.getSpeed();
        if (paddle.isMovingRight()) newX += paddle.getSpeed();

        if (newX > 0 && newX + paddle.getWidth() < window.innerWidth) {
            paddle.setX(newX);
        }
    }
}

export class SpeedBoostMovement implements MovementStrategy {
    move(paddle: Paddle): void {
        let newX = paddle.getX();
        if (paddle.isMovingLeft()) newX -= paddle.getSpeed() * 2;
        if (paddle.isMovingRight()) newX += paddle.getSpeed() * 2;

        if (newX > 0 && newX + paddle.getWidth() < window.innerWidth) {
            paddle.setX(newX);
        }
    }
}

export class FrozenMovement implements MovementStrategy {
    move(paddle: Paddle): void {
        // No movement when frozen
    }
}

export class ReverseMovement implements MovementStrategy {
    move(paddle: Paddle): void {
        let newX = paddle.getX();
        if (paddle.isMovingLeft()) newX += paddle.getSpeed();
        if (paddle.isMovingRight()) newX -= paddle.getSpeed();

        if (newX > 0 && newX + paddle.getWidth() < window.innerWidth) {
            paddle.setX(newX);
        }
    }
}
