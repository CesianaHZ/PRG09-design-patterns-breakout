import { Paddle } from "./paddle";

export class PowerUp extends HTMLElement {
    protected x: number;
    protected y: number;
    protected speedY: number = 3;

    constructor(x: number, y: number, color: string) {
        super();
        this.x = x;
        this.y = y;

        this.style.position = "absolute";
        this.style.width = "20px";
        this.style.height = "20px";
        this.style.borderRadius = "50%";
        this.style.backgroundColor = color;
        this.style.left = `${this.x}px`;
        this.style.top = `${this.y}px`;

        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
    }

    public update(paddle: Paddle) {
        this.y += this.speedY;

        if (this.y + 20 > paddle.getY() &&
            this.x > paddle.getX() &&
            this.x < paddle.getX() + paddle.getWidth()) {
            this.activateEffect(paddle);
            this.remove();
        }

        this.draw();
    }

    protected activateEffect(paddle: Paddle) {}

    private draw() {
        this.style.top = `${this.y}px`;
    }
}
window.customElements.define("powerup-component", PowerUp as any);
