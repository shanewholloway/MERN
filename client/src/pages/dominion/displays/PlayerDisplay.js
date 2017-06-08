import React from "react"
import { observer, inject } from "mobx-react"
import  PlayerStats from "./PlayerStats"
import  PlayedCards from "./PlayedCards"
import  PlayerHand from "./PlayerHand"

@inject("store") @observer
export default class PlayerDisplay extends React.Component {
    

    //ideally I'd like this button to have several states and change it's text based on the state
    //really the button just needs to show pass and end turn do i need state for the button text?
    next_phase(){
        //moving all logic to gameclass side
       const { current_game } = this.props.store
       const { current_player } = this.props.store.current_game
        //// END ACTION PHASE //// 
       if(current_game.current_phase == "Action"){
        current_game.end_action()
            return 
         //// END BUY PHASE ////
        }
        if(current_game.current_phase == "Buy"){
            current_game.end_buy()
            return
        }
        //leave the resolve action phase and return to the action phase
        if(current_game.current_phase == "Playing"){
            console.log("the method to resolve is",current_game.card_to_resolve,current_game.card_to_resolve.resolve )
            if(current_game.card_to_resolve.resolve){
                current_game.card_to_resolve.resolve(current_player)

            }
            current_game.card_to_resolve = {}
            current_game.current_phase ="Action" //not sure this is always going to be 
            //true but it works for right now
            return
        }
    }
    render(){
        const { current_player, current_phase } = this.props.store.current_game
       
        return (
            <div>
                <p>{current_player.message[current_phase]}</p>
                <button className="ui button" onClick={this.next_phase.bind(this)}>{current_player.button_text[current_phase]} </button>

                <PlayerStats player = {current_player} />
                <h3>Played Cards</h3>
                <PlayedCards played = {current_player.played}/>
                <h3>{current_player.name}'s Hand</h3>
                <PlayerHand hand= {current_player.hand} />
            </div>
        )
    }
}