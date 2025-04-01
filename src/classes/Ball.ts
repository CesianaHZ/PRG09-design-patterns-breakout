import { BrickManager } from "./BrickManager";
import { Paddle } from "./paddle";

export class Ball extends HTMLElement {
    private x: number;
    private y: number;
    private speedX: number = Math.random() < 0.5 ? -3 : 3;
    private speedY: number = -7;
    private radius: number = 10;

    constructor(paddle: Paddle) {
        super();

        this.x = paddle.getX() + paddle.getWidth() / 2;
        this.y = paddle.getY() - this.radius * 2;

        this.style.position = "absolute";
        this.style.width = `${this.radius * 2}px`;
        this.style.height = `${this.radius * 2}px`;
        this.style.borderRadius = "50%";
        this.style.backgroundColor = "white";
        this.style.left = `${this.x}px`;
        this.style.top = `${this.y}px`;

        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
    }

    public update(brickManager: BrickManager, paddle: Paddle) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x + this.radius * 2 > window.innerWidth) {
            this.speedX *= -1;
        }

        if (this.y < 0) {
            this.speedY *= -1;
        }

        if (this.y + this.radius * 2 >= paddle.getY() &&
            this.x + this.radius > paddle.getX() &&
            this.x < paddle.getX() + paddle.getWidth()) {
            this.speedY *= -1;
        }

        for (let brick of brickManager.getBricks()) {
            if (this.x + this.radius > brick.offsetLeft &&
                this.x < brick.offsetLeft + brick.clientWidth &&
                this.y + this.radius > brick.offsetTop &&
                this.y < brick.offsetTop + brick.clientHeight) {
                this.speedY *= -1;
                brickManager.removeBrick(brick);
                break;
            }
        }
        
        brickManager.updatePowerUps(this, paddle);

        if (this.y > window.innerHeight) {
            this.y = 500;
            this.x = 700;
            this.speedX = Math.random() < 0.5 ? -3 : 3;
            this.speedY = -7;
            paddle.setX(700);
        }

        this.draw();
    }

    private draw() {
        this.style.left = `${this.x}px`;
        this.style.top = `${this.y}px`;
    }
}

window.customElements.define("ball-component", Ball as any);