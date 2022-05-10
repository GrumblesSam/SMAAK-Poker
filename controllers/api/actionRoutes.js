const router = require('express').Router();
const Poker = require('poker-ts');


router.get('/table', (req, res) => {
    try{
        res.json(table.holeCards());
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

router.get('/makeTable', (req, res) => {
    table = new Poker.Table({ smallBlind: 50, bigBlind: 100 })
    res.json(table.seats());
});

// router.post('loggedIn', (req, res) => {
//     req.session.save(() => {
//         req.session.loggedIn = true;
//         res.status(200);
//     });
// })

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

    module.exports = router;