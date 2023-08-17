import { english_game, spanish_game } from "./lists.js";
document.addEventListener('DOMContentLoaded', () => {
    class Player {
        constructor(name, role, imposter){
            this.name = name;
            this.role = role;
            this.imposter = imposter;
        }
    }

    function replay(){
        endGame.style.display = 'none'
        pos = 0
        topic = Object.keys(game_list)[getRandomInt(Object.keys(game_list).length -1)]
        alphaList = createPlayerList(topic, betaList)
        alphaList = chooseImposter(alphaList)
        gameCard.style.display = 'grid'        
        current = alphaList[pos]
        names.textContent = current.name
        role.textContent = current.role
        imposterName.textContent = imposter.name
    }

    function getRandomInt(max) {
        return Math.round(Math.random() * max);
    }

    function chooseImposter(list) {
        let chosen = list[getRandomInt(list.length -1)]
        imposter = chosen
        chosen.imposter = true
        chosen.role = 'imposter'
        return list
    }

    function genRole(theme){
        return game_list[theme][getRandomInt(Object.keys(game_list)[0].length -1)]
    }
    
    function createPlayerList(theme, list){
        let defList = []
        for(let j = 0; j < list.length; j++){
            let name = list[j]
            let playerRole = genRole(theme)
            let newPlayer = new Player(name, playerRole, false)
            defList.push(newPlayer)
            console.log(defList)
        }
        return defList
    }

    let game_list;
    let betaList = [];  
    let alphaList = [];
    let replayList = [];
    let topic;
    let pos = 0;
    let current;
    let imposter;

    const langCard = document.getElementById('lang-choice')
    const listCard = document.getElementById('list-maker')
    const gameCard = document.getElementById('game-card')
    
    const englishButton = document.getElementById('english')
    const spanishButton = document.getElementById('spanish')

    englishButton.addEventListener('click', () => {
        game_list = english_game
        topic = Object.keys(game_list)[getRandomInt(Object.keys(game_list).length -1)]
        langCard.style.display = 'none'
        listCard.style.display = 'block'
    })

    spanishButton.addEventListener('click', () => {
        game_list = spanish_game
        topic = Object.keys(game_list)[getRandomInt(Object.keys(game_list).length -1)]
        langCard.style.display = 'none'
        listCard.style.display = 'block'
    })

    const addPlayer = document.getElementById('add-player')
    const startGame = document.getElementById('start')

    startGame.addEventListener('click', () => {
        if (betaList.length >= 3 && betaList.length <= 10){
            alphaList = createPlayerList(topic, betaList)
            alphaList = chooseImposter(alphaList)
            listCard.style.display = 'none'
            gameCard.style.display = 'grid'
            current = alphaList[pos]
            names.textContent = current.name
            role.textContent = current.role
            imposterName.textContent = imposter.name + ' Was the Greenposter!!'
        }else{
            prompt('You need between 3 and 10 people to play', null)
        }
    })

    addPlayer.addEventListener('click', () => {
        if (betaList.length < 10){
            let playerName = document.getElementById('new-player').value
            if (playerName.length >= 1){
                betaList.push(playerName)
                document.getElementById('new-player').value = ''
            }
        } else{
            prompt('Max is 10 players, press Start game to play.')
        }
    })

    const names = document.getElementById('playerName')
    const seeRole = document.getElementById('see-role')
    const next = document.getElementById('next-player')
    const reveal = document.getElementById('reveal')
    const role = document.getElementById('playerRole')
    const imposterName = document.getElementById('imposter-name')
    const endGame = document.getElementById('endGame')
    const playAgain = document.getElementById('play-again')

    seeRole.addEventListener('click', () => {
        role.style.display = 'block';
    })

    next.addEventListener('click', () => {
        role.style.display = 'none'
        pos = pos +1
        if (pos >= alphaList.length){
            reveal.style.display = 'block';
            gameCard.style.display = 'none'
            reveal.addEventListener('click', () => {
                endGame.style.display = 'grid'
                reveal.style.display = 'none'
            })
        }else{
            current = alphaList[pos]
            names.textContent = current.name
            role.textContent = current.role
        }
    })

    playAgain.addEventListener('click', () => {
        replay()
    })


    document.addEventListener('keydown', (event) => {
        if(event.key == 'Enter' && listCard.style.display != 'none'){
            event.preventDefault()
            addPlayer.click()
        }
    })
});