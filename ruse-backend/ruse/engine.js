const voucher_codes = require('voucher-code-generator');

/**CREATE EVENT VOUCHERS 
 * 
 * TODO SET codici utilizzati, struttura eventi ad array,
*/

const vouchers = voucher_codes.generate({
    length: 6,
    count: 100,
    charset: "0123456789"
});

var live_events = {};
var n_events = 0;

/*********** EVENT CREATION */

/**Elegant pairing function */

const elegantPair = (x, y) => {
    return (x >= y) ? (x * x + x + y) : (y * y + x);
}
  
const elegantUnpair = (z) => {
    const sqrtz = Math.floor(Math.sqrt(z));
    const sqz = sqrtz * sqrtz;
    return ((z - sqz) >= sqrtz) ? [sqrtz, z - sqz - sqrtz] : [z - sqz, sqrtz];
}

const generateEventCode = (id) => {
    const x = id - 1;
    const y = id + 1;
    let val = elegantPair(x, y).toString();

    //ensure 6 digit code
    // if (val.length < 6) {
    //     for (let i = 0; i < 6 - val.length; i++) {
    //         val += '0';
    //     }
    //     console.log(val);
    // }

    return val;
}
const createEvent = () => {
    const event = {
        eCode: undefined,
        users: [],
        artist: undefined,
        data: [],
        intervals: [],
        ratios: {
                'first':[{sum: [0, 0, 0], count: [0, 0, 0], ratio: [0, 0, 0]}, 
                        {sum: [0, 0, 0], count: [0, 0, 0], ratio: [0, 0, 0]}, 
                        {sum: [0, 0, 0], count: [0, 0, 0], ratio: [0, 0, 0]}], 
                'second':[{sum: [0, 0, 0], count: [0, 0, 0], ratio: [0, 0, 0]},
                        {sum: [0, 0, 0], count: [0, 0, 0], ratio: [0, 0, 0]},
                        {sum: [0, 0, 0], count: [0, 0, 0], ratio: [0, 0, 0]}]
        },
        nextInterval: {
            'first': [0, 0, 0],
            'second': [0, 0, 0],
            status: false,
        },
        active: {
            first: [false, false, false],
            second: [false, false, false]
        },
        allActive: true,
        events: {
            first: [false, false, false],
            second: [false, false, false]
        },
        closed: false,
        timer: undefined,
    }
    if (n_events === 0) {

        //event.eCode = generateEventCode(n_events);
        //event.eCode = vouchers[n_events];
        event.eCode = 999999;

        //n_events ++;
        console.log(event.eCode);

        live_events[event.eCode] = event;
    }

    // return eventCode
    return event.eCode !== undefined ? {status: true, eCode: event.eCode} : {status: false, msg: 'No more events'};
};

/** UTILS TO FIND EVENT */

const findEvent = (eCode) => {
    // const id = elegantUnpair(eCode);
    // const event = live_events[id[0] + 1];
    if (eCode <= 0) {
        return {status: false, msg: 'This event does not exist or it is closed', event: null}
    }

    const event = live_events[eCode];

    if (event === undefined) {
        return {status: false, msg: 'This event does not exist or it is closed', event: null}
    }

    if (event.closed) {
        return {status: false, msg: 'This event is closed', event: null}
    }

    return {status: 'success', msg: 'Event success', event: event};
}

const closeEvent = (eCode, date) => {
    const {status, msg, event} = findEvent(eCode);
    if (!status) {
        return {status: 'error', msg: msg}
    }
    
    event.closed = true;

    return true
}

const findArtist = (eCode) => {
    const {status, msg, event} = findEvent(eCode);
    if (!status) {
        return {status: 'error', msg: msg}
    }

    return event ? event.artist : false;
}

const getAudienceCheck = (eCode) => {
    const {status, msg, event} = findEvent(eCode);
    if (!status) {
        return {status: 'error', msg: msg}
    }
    return {status: 'success', eCode: event.eCode};
}

const addUser = (user_id, eCode, type) => {
    const {status, msg, event} = findEvent(eCode);
    if (!status) {
        return {status: 'error', msg: msg}
    }
    if (type === 'artist') {
        // if (event.artist === undefined) {
        //     event.artist = user_id; 
        // } else {
        //     return {status: 'error', msg: 'There is already another client as Artist'};
        // }

        event.artist = user_id; 
    } else {
        event.users.push(user_id);
    }
    return {status: 'success', msg: 'Success'};  
}

const disconnectArtist = (eCode) => {
    const {status, msg, event} = findEvent(eCode);
    if (!status) {
        return {status: 'error', msg: msg}
    }

    event.artist = undefined;
}

const updateState = (data, eCode) => {
    const {status, msg, event} = findEvent(eCode);
    if (!status) {
        return {status: 'error', msg: msg}
    }

    const send_data = [
        [event.ratios['first'][0].ratio[2], 
        event.ratios['first'][1].ratio[2], 
        event.ratios['first'][2].ratio[2]
        ],
        [event.ratios['second'][0].ratio[2],
        event.ratios['second'][1].ratio[2], 
        event.ratios['second'][2].ratio[2],
        ]
    ];

    event.data.push(data);
    console.log(event.intervals, event.intervals[event.intervals.length - 1])
    event.intervals[event.intervals.length - 1].intervalVotes.push(data);
    updateRatios(data, eCode);
    return { status: 'success', data: event.data, send: send_data, ratios: event.ratios, event: event.events[data.chart][data.set] };
}

const getNextInterval = (eCode) => {
    //const nextInterval = event.nextInterval;
    return event.nextInterval ;
}

const getUpdate = (eCode) => {
    const {status, msg, event} = findEvent(eCode);
    if (!status) {
        return {status: 'error', msg: msg}
    }

    const ratios = {...event.ratios};

    event.ratios['first'].forEach((el, index) => {
        el.ratio[2] = 0;
        event.active['first'][index] = false;
    });

    event.ratios['second'].forEach((el, index) => {
        el.ratio[2] = 0;
        event.active['second'][index] = false;
    });

    event.nextInterval.status = false;

    return { status: 'success', data: event.data, ratios: ratios, nextInterval: event.nextInterval };

}

const getState = (eCode) => {
    
    const {status, msg, event} = findEvent(eCode);
    if (!status) {
        return {status: 'error', msg: msg}
    }

    return { status: 'success', data: { data: event.data, ratios: event.ratios, active: event.active, events: event.events} };
}

const updateActive = (data, all, eCode) => {
    const {status, msg, event} = findEvent(eCode);
    if (!status) {
        return {status: 'error', msg: msg}
    }
    if (all) {
        event.active = {
            first: [data, data, data],
            second: [data, data, data]
        };
        event.allActive = data;
    } else {
        event.active[data.chart][data.set] = data.value;
    }

    return {status: 'success', data: event.active };
}

const updateRatios = (data, eCode) => {
    const {status, msg, event} = findEvent(eCode);
    if (!status) {
        return {status: 'error', msg: msg}
    }
    if (event.allActive) {
        const newSum = event.ratios[data.chart][data.set].sum[0] + data.data.ratio;
        event.ratios[data.chart][data.set].sum[0] = newSum;
        event.ratios[data.chart][data.set].count[0]++;
        event.ratios[data.chart][data.set].ratio[0] = newSum /  event.ratios[data.chart][data.set].count[0];

        //event of the axis true, so update it
        if (event.events[data.chart][data.set]){
            const newSum = event.ratios[data.chart][data.set].sum[1] + data.data.ratio;
            event.ratios[data.chart][data.set].sum[1] = newSum;
            event.ratios[data.chart][data.set].count[1]++;
            event.ratios[data.chart][data.set].ratio[1] = newSum /  event.ratios[data.chart][data.set].count[1];
        }

        //updates for API 
        const newSum2 = event.ratios[data.chart][data.set].sum[2] + data.data.ratio;
        event.ratios[data.chart][data.set].sum[2] = newSum2;
        event.ratios[data.chart][data.set].count[2]++;
        event.ratios[data.chart][data.set].ratio[2] = newSum2 /  event.ratios[data.chart][data.set].count[2];
    }
}

const updateEvents = (data, eCode) => {
    const {status, msg, event} = findEvent(eCode);
    if (!status) {
        return {status: 'error', msg: msg}
    }
    event.events[data.chart][data.set] = data.value;
    if (!data.value) {
        event.ratios[data.chart][data.set].sum[1] = 0;
        event.ratios[data.chart][data.set].count[1] = 0;
        event.ratios[data.chart][data.set].ratio[1] = 0;
    }

    return {status: 'success', data: event.events};
}

const updateComposition = (data, eCode) => {
    const {status, msg, event} = findEvent(eCode);
    if (!status) {
        return {status: 'error', msg: msg}
    }
    event.events = data;
    // check if axes where event is triggered are active, if not activate them
    for(let i = 0; i < 3; i++) {
        if (event.events.second[i] && (event.events.second[i] !== event.active.second[i])) {
            event.active.second[i] = !event.active.second[i];
        }

        if (event.events.first[i] && (event.events.first[i] !== event.active.first[i])) {
            event.active.first[i] = !event.active.first[i];
        }
    }
    return [event.events, event.active];   
}

const createInterval = (ratios, actives) => {
    const interval = {
        intervalSettings: {
            initialRatios: ratios,
            actives: actives,
        },
        intervalVotes: [],
        timestamp: new Date(),
    }
    return interval;
}

const setIntervalTime = (interval, eCode, max) => {
    if (max) {
        return setIntervalTimeMax(interval, eCode);
    } else {
        return setIntervalTimeRuse(interval, eCode);
    }
}

const setIntervalTimeRuse = (interval, eCode) => {
    console.log(interval)
    const {status, msg, event} = findEvent(eCode);
    if (!status || event.nextInterval.status) {
        return {status: 'error', msg: msg}
    }

    const active = {
        'first': [false, false, false],
        'second': [false, false, false]
    };

    const ratios = {
        'first': [0, 0, 0],
        'second': [0, 0, 0]
    };

    interval.first.forEach((el, idx) => {
        if (typeof el === 'number') {
            ratios['first'][idx] = el;
            active['first'][idx] = true;
        }
    })

    interval.second.forEach((el, idx) => {
        if (typeof el === 'number') {
            ratios['second'][idx] = el;
            active['second'][idx] = true;
        }
    })

    const newInterval = createInterval(ratios, active);

    event.intervals.push(newInterval);
    event.active = active;
    event.nextInterval.status = true;
    
    
    return {status: 'success', data: {ratios: ratios, active: active} }
}

const setIntervalTimeMax = (interval, eCode) => {
    const {status, msg, event} = findEvent(eCode);
    if (!status || event.nextInterval.status) {
        return {status: 'error', msg: msg}
    }

    const ratios = {
        'first': [0, 0, 0],
        'second': [0, 0, 0]
    };

    const active = {
        'first': [false, false, false],
        'second': [false, false, false]
    };

    interval.forEach(el => {
        const id = (el.id - 1) % 3;
        const chart = el.id > 3 ? 'second' : 'first';

        ratios[chart][id] = parseFloat(el.val);
        active[chart][id] = true;
    })

    const newInterval = createInterval(ratios, actives);

    event.intervals.push(newInterval);
    event.active = active;
    event.nextInterval.status =  true;
    console.log(ratios, active)


    return {status: 'success', data: {ratios: ratios, active: active} }
}

const endEventTimeout = (eCode) => {
    const {status, msg, event} = findEvent(eCode);
    if (!status) {
        return {status: 'error', msg: msg}
    }

    event.ratios['first'].forEach((el, index) => {
        el.ratio[2] = 0;
    });

    event.ratios['second'].forEach((el, index) => {
        el.ratio[2] = 0;
    });
    console.log(event.nextInterval.status)

    event.nextInterval.status = false;
}


module.exports = {
    createEvent,
    updateState,
    getUpdate,
    getState,
    updateActive,
    updateRatios,
    updateEvents,
    updateComposition,
    addUser,
    getAudienceCheck,
    findArtist,
    closeEvent,
    disconnectArtist,
    setIntervalTime
};