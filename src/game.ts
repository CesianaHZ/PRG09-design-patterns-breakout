import { Ball } from "./classes/Ball";
import { BrickManager } from "./classes/BrickManager";
import { Paddle } from "./classes/paddle";

/**
 * The game class is the main class of the game. It creates all the objects and
 * starts the game loop.
 */
class Game {

    // fields
    private paddle: Paddle;
    private ball: Ball;
    private brickManager: BrickManager;

    constructor() {
        this.paddle = new Paddle();
        this.ball = new Ball(this.paddle);
        this.brickManager = new BrickManager();

        this.gameLoop();
    }

    private gameLoop() {
        this.paddle.update();
        this.ball.update(this.brickManager, this.paddle);
        requestAnimationFrame(() => this.gameLoop());
    }
}

// This is the entry point of the game. It is called when the page is loaded.
window.addEventListener("load", () => new Game())