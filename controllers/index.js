const Poker = require('poker-ts');

table = new Poker.Table({ smallBlind: 50, bigBlind: 100 })

table.sitDown(0, 1000); // seat a player at seat 0 with 1000 chips buy-in
table.sitDown(2, 1500); // seat a player at seat 2 with 1500 chips buy-in
table.sitDown(5, 1700); // seat a player at seat 5 with 1700 chips buy-in

const getPlayerActionSomehow = async (seatIndex) => {
    console.log('made it inside');
    console.log(table.holeCards()[seatIndex]);
    console.log(table.legalActions());
    // try {
    //     action = await inquirer.prompt([{type:'input', name:'action', message:'What is your action?',}]);
    //     res.json(action);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
    const action = document.querySelector('#action').value;
    const betSize = document.querySelector('#bet-size').value;
    if (action && betSize) {
        const response = await fetch('', {
            method: 'POST',
            body: JSON.stringify({action, betSize}),
            headers: {'Content-Type': 'application/json'},
        });

    }
};
//     return ([getAction, getBetSize]);
//     inquirer
//         .prompt([
//             // {
//             // type: 'list',
//             // name: 'action',
//             // message: 'What is your action?',
//             // choices: ['fold', 'check', 'call', 'bet', 'raise']
//             // },
//             {
//             type: 'input',
//             name: 'action',
//             message: 'What is your action?',
//             },
//             {
//             type: 'number',
//             message: 'What is your bet size?',
//             name: 'betSize',
//             },
//         ])
//         .then((data) => {
//             console.log(data);
//             return ([action, betSize] = data);
//         });
// }
document
    .querySelector('.action-form')
    .addEventListener('submit', getPlayerActionSomehow)

table.startHand();
  
while (table.isHandInProgress()) {
    while (table.isBettingRoundInProgress()) {
      const seatIndex = table.playerToAct();
      
      
      // Get `action` and possibly `betSize` in some way
      // if there's a table showing the cards, there should be a button saying an action
      // and a field for bet size. I can take the values when someone hits the action button
      // and put those values in here.
      const [action, betSize] = getPlayerActionSomehow(seatIndex);
      
      table.actionTaken(action, betSize);
    }
    
    table.endBettingRound()
    
    if (table.areBettingRoundsCompleted()) {
      table.showdown()
    }
}
