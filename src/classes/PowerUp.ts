import { Freeze } from "./Freeze";
import { Paddle } from "./paddle";
import { PowerUpStrategy } from "./PowerUpStrategy";
import { ReverseControls } from "./ReverseControls";
import { SpeedBoost } from "./Speedboost";

export class PowerUp extends HTMLElement {
    private x: number;
    private y: number;
    private speedY: number = 3;
    private strategy: PowerUpStrategy;

    constructor(x: number, y: number, strategy: PowerUpStrategy) {
        super();
        this.x = x;
        this.y = y;
        this.strategy = strategy;

        this.style.position = "absolute";
        this.style.width = "20px";
        this.style.height = "20px";
        this.style.borderRadius = "50%";
        this.style.backgroundColor = this.getColorByStrategy();
        this.style.left = `${this.x}px`;
        this.style.top = `${this.y}px`;

        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
    }

    private getColorByStrategy(): string {
        if (this.strategy instanceof SpeedBoost) return "blue";
        if (this.strategy instanceof ReverseControls) return "yellow";
        if (this.strategy instanceof Freeze) return "red";
        return "white";
    }

    public update(paddle: Paddle) {
        this.y += this.speedY;

        if (this.y + 20 > paddle.getY() &&
            this.x > paddle.getX() &&
            this.x < paddle.getX() + paddle.getWidth()) {
            this.strategy.applyEffect(paddle);
            this.remove();
        }

        this.draw();
    }

    private draw() {
        this.style.top = `${this.y}px`;
    }
}

window.customElements.define("powerup-component", PowerUp as any);
