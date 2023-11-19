import { jobList } from "./lists.js";

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Player {
    constructor(name, role){
        this.name = name,
        this.role = role
    }

    getName(){
        return this.name
    }
    getRole(){
        return this.role
    }

}

let workplace;
let imposter

const start_button = document.getElementById('start_button')
const start = document.getElementById('start')
const adding_players = document.getElementById('adding_players')

start_button.addEventListener('click', () => {
    start.style.display = 'none'
    adding_players.style.display = 'flex'
    workplace = Object.keys(jobList)[getRandomInt(0, Object.keys(jobList).length -1)]
})

let playerList = []
let pos = 0

const add_player_button = document.getElementById('add_player_button')
const player_ul = document.getElementById('player_ul')
const add_player_input = document.getElementById('add_player_input')
const choose_imposter_button = document.getElementById('choose_imposter')

function reloadUL(){
    player_ul.innerHTML = '<h1>Juegan: </h1>'

    playerList.forEach(player => {
        const newLi = document.createElement('li')
        newLi.textContent = player.name
        player_ul.appendChild(newLi)
    })
}

function set_role(){
    let role = getRandomInt(0, 9);
    return jobList[workplace][role]
}

add_player_button.addEventListener('click', () => {
    if(playerList.length < 10){
        let newPlayerName = add_player_input.value.trim()
        newPlayerName = newPlayerName[0].toUpperCase() + newPlayerName.slice(1).toLowerCase()

        if(newPlayerName.length >= 3){
            let newPlayer = new Player(newPlayerName, set_role())
            playerList.push(newPlayer)

            add_player_input.value = ''

            reloadUL()
        }
    } else{
        alert('Máximo de jugadores (10) alcanzado')
    }
})

const see_roles = document.getElementById('see_roles')
let player_name = document.getElementById('player_name')
let player_role = document.getElementById('player_role')
let see_workplace = document.getElementById('see_workplace')

choose_imposter_button.addEventListener('click', () => {
    if(playerList.length >= 3){
        imposter = playerList[getRandomInt(0, playerList.length -1)]
        imposter.role = 'Greenposter'
        see_roles.style.display = 'flex'
        adding_players.style.display = 'none'
        if(playerList[pos].role != 'Greenposter'){
            player_role.style.color = '#eee'
        }else{
            player_role.style.color = '#AA0000'
        }
        player_name.innerHTML = playerList[pos].name
        player_role.innerHTML = playerList[pos].role
    } else{
        alert('Mínimo debe haber 3 jugadores.')
    }
})  

const see_role_button = document.getElementById('see_role_button')
const next_player_button = document.getElementById('next_player_button')

see_role_button.addEventListener('click', () => {
    player_role.style.display = 'block'
    if(player_role.innerHTML != 'Greenposter'){
        see_workplace.innerHTML = workplace
        see_workplace.style.display = 'block'
    }
})

const reveal = document.getElementById('reveal')

next_player_button.addEventListener('click', () => {
    if(pos < playerList.length -1){
        pos += 1
        if(playerList[pos].role != 'Greenposter'){
            player_role.style.color = '#eee'
        }else{
            player_role.style.color = '#AA0000'
        }
        player_name.innerHTML = playerList[pos].name
        player_role.innerHTML = playerList[pos].role
        player_role.style.display = 'none'
        see_workplace.style.display = 'none'
    } else{
        player_role.style.display = 'none'
        see_workplace.style.display = 'none'
        see_roles.style.display = 'none'
        reveal.style.display = 'flex'
    }
})

const greenposter_name = document.getElementById('greenposter_name')
const greenposter_reveal_button = document.getElementById('greenposter_reveal_button')
const play_again = document.getElementById('play_again')

greenposter_reveal_button.addEventListener('click', () => {
    greenposter_name.innerHTML = `El greenposter era ${imposter.name}!!!`
    greenposter_reveal_button.style.display = 'none'
    greenposter_name.style.display = 'block'
    play_again.style.display = 'block'
})

play_again.addEventListener('click', () => {
    workplace = Object.keys(jobList)[getRandomInt(0, Object.keys(jobList).length -1)]
    pos = 0
    playerList.map(player => {
        player.role = set_role()
    })
    greenposter_name.innerHTML = ''
    greenposter_name.style.display = 'none'
    play_again.style.display = 'none'
    reveal.style.display = 'none'
    choose_imposter_button.click()
    greenposter_reveal_button.style.display = 'block'
})