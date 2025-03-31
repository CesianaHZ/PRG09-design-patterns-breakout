export abstract class Brick extends HTMLElement {
    protected x: number;
    protected y: number;
    protected width: number = 64;
    protected height: number = 32;
    protected hitPoints: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;

        this.style.position = "absolute";
        this.style.left = `${this.x}px`;
        this.style.top = `${this.y}px`;

        let game = document.getElementsByTagName("game")[0];
        if (game) {
            game.appendChild(this);
        } else {
            console.error("Game element not found!");
        }
    }

    public hit(): boolean {
        this.hitPoints--;
        return this.hitPoints <= 0;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public destroy() {
        this.remove();
    }
}