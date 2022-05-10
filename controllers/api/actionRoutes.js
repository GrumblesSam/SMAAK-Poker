const router = require('express').Router();
const Poker = require('poker-ts');

// const getPlayerActionSomehow = async (seatIndex) => {
//     console.log('made it inside');
//     console.log(table.holeCards()[seatIndex]);
//     console.log(table.legalActions());
//     // try {
//     //     action = await inquirer.prompt([{type:'input', name:'action', message:'What is your action?',}]);
//     //     res.json(action);
//     // } catch (err) {
//     //     res.status(500).json(err);
//     // }
//     const action = document.querySelector('#action').value;
//     const betSize = document.querySelector('#bet-size').value;
//     if (action && betSize) {
//         const response = await fetch('', {
//             method: 'POST',
//             body: JSON.stringify({action, betSize}),
//             headers: {'Content-Type': 'application/json'},
//         });

//     }
// };

router.get('/table', (req, res) => {
    try{
        console.log(table.seats());
        console.log(table.holeCards());
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/', async(req, res) => {
    try{
        console.log('hi')
        res.json( {name: "koki"});
    }
    catch(e){
        console.log(e);
    }
});

router.post('/makeTable', (req, res) => {
    table = new Poker.Table({ smallBlind: 50, bigBlind: 100 })
});

router.post('/startGame', (req, res) => {
    if (req.session.logged_in ) {
      //start game
      table.startHand();
      ;
    } else {
      res.redirect('/login').end();
    }
  });

router.post('/sitDown/:seat', (req, res) => {
    if (req.session.logged_in) {
      //assign seat (choose)
      // can't join a hand in progress
      table.sitDown(req.params.seat, 10000);
      ;
    } else {
      res.redirect('/login').end();
    }
  });

router.post('/call/:seat', (req, res) => {
    // pass in current active seat
    if (req.body.seat===req.params.seat) {
        table.actionTaken('call');
      //call action
      ;
    } else {
      res.json('done').end();
    }
  });

router.post('/fold/:seat', (req, res) => {
// pass in current active seat
    if (req.body.seat===req.params.seat) {
        table.actionTaken('fold');
        //call action
        ;
    } else {
        res.json('done').end();
    }
    });

router.post('/check/:seat', (req, res) => {
// pass in current active seat
    if (req.body.seat===req.params.seat) {
        table.actionTaken('check');
    //call action
    ;
    } else {
    res.json('done').end();
    }
    });

router.post('/bet/:seat', (req, res) => {
// pass in current active seat
    if (req.body.seat===req.params.seat) {
        table.actionTaken('bet');
        //call action
        ;
    } else {
        res.json('done').end();
    }
    });

router.post('/raise/:seat', (req, res) => {
    // pass in current active seat
    if (req.body.seat===req.params.seat) {
        table.actionTaken('raise');
    //call action
    ;
    } else {
    res.json('done').end();
    }
    });