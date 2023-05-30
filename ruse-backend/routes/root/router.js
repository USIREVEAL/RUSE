/** @module root/router */

const express = require('express');
const router = express.Router();

// require all function
const {
    getState, 
  } = require('../../ruse/engine.js');

router.post('/getData', (req, res) => {
    const event = getState(req.body.eCode);
    const data = event.data.ratios;
    const active = event.data.active;
    const set = 2;
    const send_data = [
        [{ val: data['first'][0].ratio[set], active: active['first'][0] ? 1 : 0} , 
        { val: data['first'][1].ratio[set], active: active['first'][1] ? 1 : 0}, 
        { val: data['first'][2].ratio[set], active: active['first'][2] ? 1 : 0}],

        [{ val: data['second'][0].ratio[set], active: active['second'][0] ? 1 : 0}, 
        { val: data['second'][1].ratio[set], active: active['second'][1] ? 1 : 0}, 
        { val: data['second'][2].ratio[set], active: active['second'][2] ? 1 : 0}]
    ];
    res.send(send_data);
});

router.post('/getExport', (req, res) => {
    const event = getState(req.body.eCode);
    const data = event.data.data;
    
    res.send(data);
});

router.post('/export', (req, res) => {
    const event = getState(req.body.eCode);
    const data = event.data.data;

    res.send(data);
});

/** router for /API */
module.exports = router;
