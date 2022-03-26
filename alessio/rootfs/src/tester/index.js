/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import externals
const schedule = require('node-schedule');
const axios = require('axios');

// > > > > > > > > > > > > > > > > > > > > > > > The code
console.log('Tester started!');

const client = axios.create({
  baseURL: `http://localhost`
  //baseURL: `http://10.0.0.190`
});
client.interceptors.response.use(
  (response) => {
    console.log(response.data);
    return response;
  },
  (response) => {
    console.error(response.status);
  }
);

// Get username
var auth;
const getAuth = async () => {
  if (!auth) {
    auth = await client.post('/api', { devicetype: 'debugger' }).then((response) => response.data[0].success.username);
  }

  return auth;
}

const job = schedule.scheduleJob('*/5 * * * * *', async () => {
  try {
    console.log('Start requests');

    //await client.get('/description.xml');
    //await client.post('/api', { devicetype: 'debugger' }).then((response) => response.data);

    let username = await getAuth();

    //await client.post(`/api/${username}/lights`);
    //await client.get(`/api/${username}/lights/new`);
    let light = await client.get(`/api/${username}/lights`);

    //await client.put(`/api/${username}/lights/1/state`, { on: true });
  } catch(err) {
    console.error(err);
  }
});
