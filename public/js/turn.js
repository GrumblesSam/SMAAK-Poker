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
    .querySelector('#action-form')
    .addEventListener('submit', getPlayerActionSomehow)
