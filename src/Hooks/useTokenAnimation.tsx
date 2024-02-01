import { useState } from 'react'
import { useGameContext } from './useContext'

const useTokenAnimation = () => {
    // Récuperer l'emplacement de la colonne visée
    // Calculer la distance libre restante dans la colonne (board[index] donnera le nombre de jetons présents à ce moment)
    // Créer un élément html utilisant les coordonnées de l'emplacement de la colonne
    // Definir le style manuellement (longueur de l'animation en fonction de la distance de chute)
    // a la fin de l'animation, supprimer l'élement et effecture le addToken
    const [isAnimating, setIsAnimating] = useState(false)
    const [showToken, setShowToken] = useState(false)
    const { board, addToken, currPlayer, winner, isGameOver } = useGameContext()

    const startAnimation = (target: HTMLDivElement, colIndex: number) => {
        const token = document.createElement('span')
        const classname = ` absolute z-40 bg-white aspect-square token rounded-full `
        const emptyCells = 6 - board[colIndex].length
        const durationAnim = emptyCells * 100
        token.className = classname
        token.style.setProperty('--empty-cells', String(emptyCells))
        token.style.setProperty('--animation-duration', `${durationAnim}ms`)
        token.classList.add('falling-token')
        token.classList.add(currPlayer === 'red' ? 'redPlayer' : 'yellowPlayer')

        if (winner || isGameOver || isAnimating) return
        target.prepend(token)

        setShowToken(true)
        setIsAnimating(true)

        // Définissez ici la logique pour la durée de l'animation
        setTimeout(
            () => {
                setShowToken(false)
                setIsAnimating(false)
                // Ici, ajoutez le jeton au tableau de jeu
                token.remove()
                addToken(colIndex, currPlayer)
            } /* durée de l'animation */,
            durationAnim
        )
    }

    return { showToken, startAnimation }
}

export default useTokenAnimation
