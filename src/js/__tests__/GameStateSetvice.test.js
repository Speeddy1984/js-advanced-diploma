import GameStateService from './GameStateService';
// import GameState from './GameState';
import GamePlay from './GamePlay';
import GameController from './GameController';

jest.mock('./GamePlay');

describe('GameStateService', () => {
let storageMock;
let gameStateService;

beforeEach(() => {
    storageMock = {
     getItem: jest.fn(),
     setItem: jest.fn(),
    };
    gameStateService = new GameStateService(storageMock);
});

test('should load game state successfully', () => {
    const savedState = {
     maxScore: 100,
     currentLevel: 2,
     isPlayerTurn: true,
     arrayOfPlayers: [],
    };
    storageMock.getItem.mockReturnValue(JSON.stringify(savedState));

    const loadedState = gameStateService.load();

    expect(loadedState).toEqual(savedState);
});

test('should handle load error', () => {
    storageMock.getItem.mockReturnValue(null);

    expect(() => {
     gameStateService.load();
    }).toThrow('Invalid state');
});

test('should show message on load error', () => {
    storageMock.getItem.mockReturnValue(null);
    GamePlay.showMessage = jest.fn();

    const gameController = new GameController(new GamePlay(), gameStateService);
    gameController.loadGameState();

    expect(GamePlay.showMessage).toHaveBeenCalledWith('Не удалось загрузить сохраненное состояние игры.');
});
});