import { minimax } from './functions'

self.onmessage = function (e) {
    const { board, depth, alpha, beta, isMaximizingPlayer, player } = e.data

    const result = minimax(
        board,
        depth,
        alpha,
        beta,
        isMaximizingPlayer,
        player
    )
    postMessage(result)
}
