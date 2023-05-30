const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// require all function
const {
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
} = require('./ruse/engine.js');

app.use(cors())

//configure app
app.use(logger('dev'));
app.use(bodyParser.json({strict: false, limit: '10mb'}));

// parse bodies with json and text format
app.use(bodyParser.text());
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({ extended: true, limit:"5mb" }));

//Routers initialization
const routers = require(__dirname + '/routes/routers');

// //Engine to store data and update artist, server side
// const engine = require('./ruse/engine.js');


app.use('/API', routers.root);


const server = app.listen(5234, function() {
    console.log('Express server listening on port ' + 5234);
});
const artist = '';

const io = require('socket.io')(server);

/* Emitting to clients */
io.on('connection', (socket) => {

  socket.on('create.event', () => {
    console.log('creation event')
    const {eCode} = createEvent();
    socket.join('artist-' + eCode);
    socket.emit('create.eventCode', eCode);
  });

  socket.on('join.event', (eCode, clientType) => {
    console.log(eCode, clientType)
    if (clientType === 'audience') {
      const status = getAudienceCheck(eCode);
      socket.emit('check.audience', status);
    } else if (clientType === 'artist') {
      socket.join('artist-' + eCode)
    } else {
      console.log('join.error')
    }
  });

  socket.on('close.event', (eCode, date) => {
    const status = closeEvent(eCode, date);
    if (status) {
      socket.broadcast.to('audience-' + eCode).emit('update.audienceCloseEvent');
    }
    //socket.emit('check.audience', status);
  });

  /* at connection set if audience or artist */
  socket.on('addClient', (data, eCode) => {
    if (data.status === 'artist') {
      const resAddUser = addUser(socket.id, eCode, 'artist');
      console.log('artist', resAddUser)
      if (resAddUser.status === 'success') {
        socket.join('artist-' + eCode);
        const res = getState(eCode);
        console.log(res)
        if (res.status === 'success') {
          socket.emit('send.artist', {data: res.data});
        }
      } else {
        socket.emit('send.artist', {data: resAddUser});
      }
    } else {
      console.log('audience')
      addUser(socket.id, eCode, 'users');
      socket.join('audience-' + eCode);
      const res = getState(eCode);
      if (res.status === 'success') {
        socket.emit('update.clientsBullet', { data: res.data.active });
      }
    }
  });

  /* Update from audience */
  socket.on('update.audience', (data, eCode) => {
    let res = updateState(data, eCode);
    socket.broadcast.emit('update.maxAPI', res.send);
    if (res.event) {
      socket.to('artist-' + eCode).emit(
        'update.artistEvent', 
        {ratio: res.ratios[data.chart][data.set].ratio[1],
         chart: data.chart,
         set: data.set,
        }
      );
    }
  });

  /* sent update from ended interval on artist client */
  socket.on('set.artist.updateInterval', (eCode) => {
    let res = getUpdate(eCode);
    console.log('timeout ended')

    socket.emit('update.artist', res);
    socket.broadcast.to('audience-' + eCode).emit('end.artist.timeout');
    socket.broadcast.to('artist-' + eCode).emit('end.artist.timeout');
  });

  socket.on('disconnect', (data, eCode) => {
    const artist = findArtist(eCode);
    console.log('disconnected', socket.id, artist)
    if (socket.id === artist) {
      console.log('artist disconnected')
      disconnectArtist(eCode);
      socket.leave('artist-' + eCode);
    } else {
      socket.emit('disconnect.client');
      socket.leave('audience-' + eCode);
    }
  });

  socket.on('update.artistBullet', (data, all, eCode) => {
    let res = updateActive(data, all, eCode);

    socket.broadcast.to('audience-' + eCode).emit('update.clientsBullet', {chart: data.chart, data: res.data});
    socket.emit('update.artistActive', res);
  })

  socket.on('update.artistEvent', (data, eCode) => {
    let res = updateEvents(data, eCode);
  })

  // update composition and broadcast to other audience clients and to artist client updated events
  socket.on('update.artistComposition', (data, eCode) => {
    let res = updateComposition(data, eCode);
    console.log(res, data);
    socket.broadcast.to('audience-' + eCode).emit('update.clientsBullet', {data: res[1]});
    socket.emit('update.artistEvents', res[0]);
  })

  socket.on('update.artist.interval', (data, eCode, max) => {
    let res = setIntervalTime(data, eCode, max);
    if (res.status === 'success') {
      console.log('sending to clients', eCode, io.sockets.adapter.rooms)
      socket.broadcast.to('audience-' + eCode).emit('set.audience.interval', res.data);
      if (max) {
        socket.to('artist-' + eCode).emit('set.artist.interval', res.data);
      }
      socket.emit('set.artist.interval', res.data);
    } else {
      console.log('error');
    }
  })

});


/*
 mongod --config /usr/local/etc/mongod.conf
 */
module.exports = app;
