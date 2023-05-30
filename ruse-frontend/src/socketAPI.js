import { io } from 'socket.io-client';

const socket = io('https://ruse.si.usi.ch/', {transports: ['websocket']});

//const socket = io('http://192.168.1.122:5234', {transports: ['websocket']});





/* --------------------- ALL SOCKET EMITS --------------------- */
/*############################################################# */


/* add a client, artist or audience */
export const addClient = (data, eCode) => {
    socket.emit('addClient', data, eCode);
}

export const getUpdateFromTimeout = (eCode) => {
    socket.emit('set.artist.updateInterval', eCode);
}

/* Update towards the artist from audience, emit to artist client */
export const updateFromAudience = (data, eCode) => {
    socket.emit('update.audience', data, eCode);
}

export const updateClientLvl = (data, eCode) => {
    socket.emit('update.clientLvl', data, eCode);
}

export const updateActive = (data, all, eCode) => {
    socket.emit('update.artistBullet', data, all, eCode);
}

export const updateEvents = (data, eCode) => {
    socket.emit('update.artistEvent', data, eCode);
}

export const updateComposition = (data, eCode) => {
    socket.emit('update.artistComposition', data, eCode);
}

export const updateNextInterval = (data, eCode) => {
    socket.emit('update.artist.interval', data, eCode, false);
}

export const startEvent = (eCode) => {
    socket.emit('create.event', eCode);
}

export const joinEvent = (eCode, clientType) => {
    socket.emit('join.event', eCode, clientType);
}

export const closeEvent = (eCode, date) => {
    socket.emit('close.event', eCode, date);
}

/* --------------------- ALL SOCKET ON --------------------- */
/*############################################################# */
export const getEventCode = (cb) => {
    if (!socket) return(true);
    
    socket.on('create.eventCode', data => {
        return cb(null, data)
    });
}

export const getAudienceCheck = (cb) => {
    if (!socket) return(true);
    
    socket.on('check.audience', data => {
        return cb(null, data)
    });
}


/* GET the initial state or when reconnecting to the page get the actual state */
export const getUpdate = (cb) => {
    if (!socket) return(true);
    
    socket.on('send.artist', data => {
        return cb(null, data)
    });
}

/* GET update ratios for heatmap bars */
export const getUpdateArtist = (cb) => {
    if (!socket) return(true);

    socket.on('update.artist', data => {
        return cb(null, data);
    });
}

export const getUpdateArtistEvent = (cb) => {
    if (!socket) return(true);

    socket.on('update.artistEvent', data => {
        return cb(null, data);
    });
}

/* GET update on infos about clients */

/* GET update on bullets */
export const getUpdateBullets = (cb) => {
    if (!socket) return(true);

    socket.on('update.clientsBullet', data => {
        return cb(null, data);
    });
}

/* GET update on artist composition,
   update active and events
*/
export const getUpdateComposition = (cb) => {
    if (!socket) return(true);

    socket.on('update.artistEvents', data => {
        return cb(null, data);
    });
}

/* GET update artist settings all */
export const getUpdateActive = (cb) => {
    if (!socket) return(true);

    socket.on('update.artistActive', data => {
        return cb(null, data);
    });
}

/** ON close event from artist */
export const onCloseEvent = (cb) => {
    if (!socket) return(true);

    socket.on('update.audienceCloseEvent', data => {
        return cb(null, data);
    });
}

/** ON disconnect */
export const onUpdateNextInterval = (cb) => {
    if (!socket) return(true);

    socket.on('set.audience.interval', data => {
        return cb(null, data);
    });
}

/** ON disconnect */
export const onUpdateInterval = (cb) => {
    if (!socket) return(true);

    socket.on('set.artist.interval', data => {
        return cb(null, data);
    });
}

/** ON disconnect */
export const onEndEventTimeout = (cb) => {
    if (!socket) return(true);

    socket.on('end.artist.timeout', data => {
        return cb(null, data);
    });
}

/** ON disconnect */
export const onDisconnect = (cb) => {
    if (!socket) return(true);

    socket.on('disconnect.client', data => {
        return cb(null, data);
    });
}


