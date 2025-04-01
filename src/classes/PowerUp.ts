import { Freeze } from "./Freeze";
import { Paddle } from "./paddle";
import { PowerUpStrategy } from "./PowerUpStrategy";
import { ReverseControls } from "./ReverseControls";
import { SpeedBoost } from "./Speedboost";

export class PowerUp extends HTMLElement {
    private x: number;
    private y: number;
    private speedY: number = 3; // Falling speed of the power-up
    private strategy: PowerUpStrategy;

    constructor(x: number, y: number, strategy: PowerUpStrategy) {
        super();
        this.x = x;
        this.y = y;
        this.strategy = strategy;

        this.style.position = "absolute";
        this.style.width = "48px";
        this.style.height = "46px";
        this.style.backgroundImage = `url(${this.getImageByStrategy()})`;
        this.style.backgroundSize = "cover";
        this.style.left = `${this.x}px`;
        this.style.top = `${this.y}px`;

        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
    }

    private getImageByStrategy(): string {
        if (this.strategy instanceof SpeedBoost) return "/images/upgrades/polygon_blue.png";
        if (this.strategy instanceof ReverseControls) return "/images/upgrades/polygon_yellow.png";
        if (this.strategy instanceof Freeze) return "/images/upgrades/polygon_red.png";
        return "/images/upgrades/polygon_white.png";
    }

    public update(ball: HTMLElement, paddle: Paddle) {
        this.y += this.speedY;

        if (this.y + 46 > paddle.getY() &&
            this.x + 48 > paddle.getX() &&
            this.x < paddle.getX() + paddle.getWidth()) {
            this.strategy.applyEffect(paddle);
            this.remove();
            return;
        }

        const ballRect = ball.getBoundingClientRect();
        const powerUpRect = this.getBoundingClientRect();

        if (
            ballRect.left < powerUpRect.right &&
            ballRect.right > powerUpRect.left &&
            ballRect.top < powerUpRect.bottom &&
            ballRect.bottom > powerUpRect.top
        ) {
            this.strategy.applyEffect(paddle);
            this.remove();
            return;
        }

        this.draw();
    }

    private draw() {
        this.style.top = `${this.y}px`;
    }
}

window.customElements.define("powerup-component", PowerUp as any);