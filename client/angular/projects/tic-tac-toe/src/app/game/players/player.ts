import { GameResult, Board } from '../board';
import { Observable } from 'rxjs';
import { Side } from '../../store/states/board.state';

export interface IPlayer {

    readonly side: Side;

    newGame(): Observable<Side>;
    move(board: Board): Observable<{ gameResult: GameResult, finished: boolean }>;
    endGame(gameResult: GameResult): Observable<GameResult>;
}

export abstract class Player implements IPlayer {

    protected _side: Side = Side.EMPTY;
    get side() {
        return this._side;
    }

    constructor(side: Side) {
        this._side = side;
    }

    newGame(): Observable<Side> {

        return new Observable<any>((subscriber) => {

            subscriber.next(this._side);
            subscriber.complete();
        });
    }

    abstract move(board: Board): Observable<{gameResult: GameResult, finished: boolean}>;

    endGame(gameResult: GameResult): Observable<GameResult> {

        return new Observable<GameResult>((subscriber) => {

            subscriber.next(gameResult);
            subscriber.complete();
        });
    }
}