import { Brick } from "./Brick";
import { PurpleBrick } from "./PurpleBrick";
import { PowerUp } from "./PowerUp";
import { Freeze } from "./Freeze";
import { ReverseControls } from "./ReverseControls";
import { SpeedBoost } from "./Speedboost";
import { Paddle } from "./paddle";
import { YellowBrick } from "./YellowBrick";

export class BrickManager {
    private bricks: Brick[] = [];
    private powerUps: PowerUp[] = [];
    private rows: number = 7;
    private columns: number = 12;
    private brickWidth: number = 64;
    private brickHeight: number = 32;

    constructor() {
        this.spawnBricks();
    }

    private spawnBricks() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                let offsetX = (window.innerWidth - this.columns * this.brickWidth) / 2;
                let x = column * this.brickWidth + offsetX;
                let y = row * this.brickHeight + 100;

                let brick: Brick;
                if (Math.random() < 0.3) {
                    brick = new YellowBrick(x, y, this);
                } else {
                    brick = new PurpleBrick(x, y);
                }

                let game = document.getElementsByTagName("game")[0];
                if (game) {
                    game.appendChild(brick);
                } else {
                    console.error("Game element not found!");
                }

                this.bricks.push(brick);
            }
        }
    }

    public removeBrick(brick: Brick) {
        if (!brick.hit()) return;

        this.bricks = this.bricks.filter(b => b !== brick);

        if (brick instanceof PurpleBrick && brick.wasOriginallyYellow()) {
            this.spawnPowerUp(brick);
        }

        brick.destroy();
    }

    private spawnPowerUp(brick: Brick) {
        const strategies = [new SpeedBoost(), new ReverseControls(), new Freeze()];
        const randomStrategy = strategies[Math.floor(Math.random() * strategies.length)];
        const powerUp = new PowerUp(brick.getX(), brick.getY(), randomStrategy);
        this.powerUps.push(powerUp);
    }

    public updatePowerUps(ball: HTMLElement, paddle: Paddle) {
        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            const powerUp = this.powerUps[i];
            powerUp.update(ball, paddle);

            if (!document.body.contains(powerUp)) {
                this.powerUps.splice(i, 1);
            }
        }
    }

    public replaceBrick(oldBrick: Brick, newBrick: Brick) {
        const index = this.bricks.indexOf(oldBrick);
        if (index !== -1) {
            this.bricks[index] = newBrick;

            const parent = oldBrick.parentElement;
            if (parent) {
                parent.replaceChild(newBrick, oldBrick);
            }
        }
    }

    public getBricks(): Brick[] {
        return this.bricks;
    }
}