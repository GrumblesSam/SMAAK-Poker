const router = require('express').Router();
const Poker = require('poker-ts');

// end betting rounds

router.get('/table', (req, res) => {
    try{
        let holeCards = table.holeCards();
        let tableCards = table.communityCards();
        let tableStatus = {holeCards, tableCards}
        res.json(tableStatus);
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/adminTable', (req, res) => {
    table = new Poker.Table({ smallBlind: 50, bigBlind: 100 });
    table.sitDown(0, 10000); // seat a player at seat 0 with 1000 chips buy-in
    table.sitDown(2, 10000); // seat a player at seat 2 with 1500 chips buy-in
    table.sitDown(5, 10000); // seat a player at seat 5 with 1700 chips buy-in
    table.startHand();
    res.json('admin hand started')
});

router.get('/makeTable', (req, res) => {
    table = new Poker.Table({ smallBlind: 50, bigBlind: 100 });
    res.json(table.seats());
});

router.get('/startGame', (req, res) => {
    table.startHand();
    res.json('hand started');
  });

router.get('/whatNext', (req, res) => {
    res.json([
        table.playerToAct(),
        table.roundOfBetting()
    ]);

})

router.get('/tableCards', (req, res) => {
    res.json(table.communityCards());
})

router.get('/winners', (req, res) => {
    res.json(table.winners());
})

router.get('/sitDown/:seat/:chips', (req, res) => {
    // when sitting down, display how many chips you have
    // ask for input of how many you want to sit down with
    // must be within range of your chips'
    console.log(req.params);
    let mySeat = JSON.parse(req.params.seat);
    let myChips = JSON.parse(req.params.chips);
    table.sitDown(mySeat, myChips);
    res.json(table.seats()[req.params.seat]);

    // add what seat we are to db


    // if (req.session.logged_in) {
    //   //assign seat (choose)
    //   // can't join a hand in progress
    //   table.sitDown(req.params.seat, 10000);
    //   ;
    // } else {
    //   res.redirect('/login').end();
    // }


  });

router.get('/showdown', (req, res) => {
    if (table.numActivePlayers()===1) {
        table.showdown();
    } else {
        res.json('no winner yet');
    }
});

router.get('/newRound', (req,res) => {
    table.endBettingRound();
    if (table.numActivePlayers()===1 && table.isHandInProgress()) {
        console.log(table.pots());
        console.log(table.roundOfBetting());
        console.log(table.isBettingRoundInProgress());
        table.showdown();

        console.log(table.seats());
        res.status(200).json(table.winners());
    }
    else{
        res.status(200).json(table.roundOfBetting());
    }
    
})

router.get('/call/:seat', (req, res) => {
    // pass in current active seat
    if (true) {
        table.actionTaken('call');
      //call action
        res.json('call')
      ;
    } else {
      res.json('done').end();
    }
  });

router.get('/fold/:seat', (req, res) => {
// pass in current active seat
    if (true) {
        table.actionTaken('fold');
        //fold action
        // check if last player alive
        // if 1 player showdown(), else fold
        res.json('fold')
        ;
    } else {
        res.json('done').end();
    }
    });

router.get('/check/:seat', (req, res) => {
// pass in current active seat
    if (true) {
        table.actionTaken('check');
    //check action
        res.json('check')
    ;
    } else {
    res.json('done').end();
    }
    });

router.get('/bet/:seat/:betAmount', (req, res) => {
// pass in current active seat
    if (true) {
        table.actionTaken('bet', JSON.parse(req.params.betAmount));
        //bet action
        res.json('bet');
    } else {
        res.json('done').end();
    }
    });
    
// req.body.seat===req.params.seat
router.get('/raise/:seat/:betAmount', (req, res) => {
    // pass in current active seat
    if (true) {
        table.actionTaken('raise', JSON.parse(req.params.betAmount));
    //raise action
        res.json('raise')
    ;
    } else {
    res.json('done').end();
    }
    });

    module.exports = router;