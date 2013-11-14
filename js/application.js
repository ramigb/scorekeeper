/**
*	ScoreKeeper - This thing works.
*	@author Rami GB
*	@email  rami.g.b@gmail.com
*/

var keyPad;
var numOfPlayers = 2;

$(document).ready(function(){

	initScore();
	initBind();
	$('#save_settings').click(function(){
		initScore();
	})
	


}) //End of document ready

function initBind(){
	//Clean old binds
	$('.score_input').unbind('click');
	$('.numbers_keypad').unbind('click');
	$('.add_score_input').unbind('click');
	$('.player_name').unbind('click');

	$('.score_input').bind('click',function(){
		keyPad = $('.numbers_keypad');
		me = $(this);

		keyPad.fadeIn();
			
		keyPad.css('top',me.offset().top + parseInt(me.css('height')));
		keyPad.css('left',me.offset().left - (parseInt(keyPad.css('width')) / 2));
			
		bindMeToKey(me,keyPad);
	})

	$('.numbers_keypad').mouseleave(function(){
		unBindKeyPad();
		$(this).fadeOut();
	})

	//

	$('.add_score_input').bind('click',function(){
		newMe = $(this).parents('.score_row').clone(true,true);
		newMe.find('.score_input').text(0);
		$(this).parents('tbody').append(newMe);
	})	

	$('.player_name').bind('click',function(){
		name = prompt('Name');
		
		if(name.size > 0){
			$(this).text(name);	
		}else{
			return;
		}
		
	})	
}


function unBindKeyPad(){
	$('.numbers_keypad').find('a').unbind('click');
}

function bindMeToKey(me,keyPad){
	unBindKeyPad();
	keyPad.find('a').bind('click',function(){
		clickedNumber = $(this).text();
		oldNumber = me.text();

		//Negative
		if(clickedNumber == '-'){
			if(oldNumber != 0){
				return false;
			}
		}
		//Clear
		if(clickedNumber == 'C'){
			number = deleteChar(oldNumber);
		}else{
			if(oldNumber == 0){
				number = clickedNumber;
			}else{
				number = oldNumber + clickedNumber;		
			}
			
		}
		//Put final value
		me.text(number);		
		//Calculate changes
		calculateChanges();
	})
}

function calculateChanges(){
	
	for(var i=1 ; i < numOfPlayers + 1 ; i++){
	total = 0;
	scores = $('span[data-player-number='+i+']');

	scores.each(function(index,score){
		total += parseInt($(score).text());
	})

	$('span[data-player-score='+i+']').text(total);
	}
}
	

function deleteChar(text){
	if(text.length == 0){
		return 0;
	}else{
		newText = text.substr(0,text.length-1);
		return newText.length == 0 ? 0 : newText ;	
	}
	
}


function initScore(){
	numberOfPlayers = parseInt($('#number_of_players').val());
	if(numberOfPlayers > 4 || numberOfPlayers < 2){
		numOfPlayers = 2;
	}else{
		numOfPlayers = numberOfPlayers;
	}
	setupTable();
}

function setupTable(){	

	//Clean up, in case of a reset
	$('#players_names').html('');
	$('#score_table > tbody').html('');
	$('#total_row').html('');

	//Insert first row
	scoreRow = mu_scoreRow.clone();
	$('#score_table > tbody').append(scoreRow);
					
	for(var i = 1 ; i < numOfPlayers + 1; i++){		
		playerNumber = i;//more expressive variable name
		

		//PlayersNames
		playerName = mu_playerName.clone(true,true);
		playerName.text('Player ' + playerNumber);
		//Append
		$('#players_names').append(playerName);

		//Score row
		scoreInputContainer = mu_scoreInputContainer.clone(true,true);//Clone the first element
		scoreInput = mu_scoreInput.clone(true,true);	
		scoreInputContainer.attr('data-player-number',playerNumber);//For CSS purposes etc
		scoreInput.attr('data-player-number',playerNumber);//Modify the player number
		scoreInputContainer.append(scoreInput);
		scoreRow.append(scoreInputContainer);
		//Append
		//Insert it after the last one		
		scoreInputContainer = null;
		scoreInput = null; //To clean shit out


		//Total row
		totalFieldContainer = mu_scoreTotalContainer.clone(true,true);		
		totalField = mu_scoreTotal.clone();
		totalFieldContainer.attr('data-player-score',playerNumber);
		totalField.attr('data-player-score',playerNumber);
		totalFieldContainer.append(totalField);
		//Append
		$('#total_row').append(totalFieldContainer);
		totalFieldContainer = null;
		totalField = null;
	}

 	//Add extras
 	$('#players_names').append('<th></th>');
	$('.score_row').append(mu_addScoreInput);
	initBind();
}

//mu = mark up

var mu_scoreRow = $('<tr/>', {
    class: 'score_row'    
});

var mu_playerName = $('<th/>', {
    class: 'player_name',
    text:'Player 1'
});
                                      
var mu_scoreInputContainer = $('<td/>', {
    class: 'score_input_container',
    "data-player-number":1  
});
  
var mu_scoreInput = $('<span/>', {
    class: 'score_input',
    "data-player-number":1,
    text:'0'
});

var mu_addScoreInput = $('<td/>', {
    class: 'add_score_input',
    text:'+'
});

                                      
var mu_scoreTotalContainer = $('<td/>', {
    class: 'total_container',
    "data-player-score":1  
});
  
var mu_scoreTotal = $('<span/>', {
    class: 'score_total',
    "data-player-score":1,
    text:'0'
});


