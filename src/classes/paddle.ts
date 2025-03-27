import { NormalMovement } from "./movementStrategies";

export class Paddle extends HTMLElement {
    private x: number = 0;
    private y: number = 0;
    private moveLeft: boolean = false;
    private moveRight: boolean = false;
    private speed: number = 7;
    
    private movementStrategy: MovementStrategy = new NormalMovement();

    constructor() {
        super();
        console.log("Paddle created!");

        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);

        this.x = window.innerWidth / 2 - this.clientWidth / 2;
        this.y = window.innerHeight * 0.95;

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }

    private onKeyDown(e: KeyboardEvent): void {
        if (e.key === "ArrowLeft") this.moveLeft = true;
        else if (e.key === "ArrowRight") this.moveRight = true;
    }

    private onKeyUp(e: KeyboardEvent): void {
        if (e.key === "ArrowLeft") this.moveLeft = false;
        else if (e.key === "ArrowRight") this.moveRight = false;
    }

    public update() {
        this.movementStrategy.move(this);
        this.draw();
    }

    private draw(): void {
        this.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    public setMovementStrategy(strategy: MovementStrategy) {
        this.movementStrategy = strategy;
    }

    public getX(): number { return this.x; }
    public getY(): number { return this.y; }
    public getWidth(): number { return this.clientWidth; }
    public getSpeed(): number { return this.speed; }
    public setX(newX: number): void { this.x = newX; }
    public isMovingLeft(): boolean { return this.moveLeft; }
    public isMovingRight(): boolean { return this.moveRight; }
}
window.customElements.define("paddle-component", Paddle as any);
