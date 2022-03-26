/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import externals
const axios = require('axios');

// > > > > > > > > > > > > > > > > > > > > > > > Import internals
const config = require('../../commons/config/config');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const hassClient = axios.create({
  baseURL: `${config.hassio.apiUrl}/api`,
  headers: {
    "Content-Type": `application/json`,
    "Authorization": `Bearer ${config.hassio.token}`
  }
});
hassClient.interceptors.response.use(
  (response) => response.data
);

const getAlessioAbility = async (entity) => {
  if (!entity) {
    return false;
  }

  if (['switch.hassio_alessio_link_mode', 'switch.hassio_alessio_control_mode'].indexOf(entity) < 0) {
    // Get single entity control mode
    entity = `switch.hassio_alessio_${entity.replace('.','_')}_control_mode`
  }

  let entityData = await hassClient.get(`/states/${entity}`).catch((err) => null);
  if (!entityData) {
    // Entity not found, create one
    entityData = await hassClient.post(`/states/${entity}`, { state: 'on' }).catch((err) => null);
  }

  if (entityData.state === 'on') {
    return true;
  }

  return false;
};

const getEntities = async () => {
  const { exposedByDefault, domains, entities } = config.filters;

  let lights = await hassClient.get('/states')
    .then((list) => {
      // Full entities list returned from home assistant
      // Clean entities attributes
      // Set expose default value
      return list.map((row) => {
        return {
          entity: (row.entity_id) ? row.entity_id : '',
          name: (row?.attributes?.friendly_name) ? row.attributes.friendly_name : row.entity_id,
          state: row.state,
          expose: (row.entity_id) ? exposedByDefault : false
        };
      });
    })
    .then((list) => {
      // Remove from list, entities not included into allowed domains
      return list.filter(({ entity }) => {
        return (domains.length === 0 || domains.includes(entity.substring(0, entity.indexOf('.'))));
      });
    })
    .then((list) => {
      // Remove from list, entities not included into allowed domains
      return list.map(({ entity, name, expose, ...row }) => {
        let rules = entities.filter((row) => row.entity.toLowerCase() === entity.toLowerCase());
        if (rules.length > 0) {
          name = ('name' in rules[0]) ? rules[0].name : name;
          expose = ('expose' in rules[0]) ? rules[0].expose : expose;
        }
        return { ...row, entity, name, expose };
      });
    })
    .then((list) => {
      // Remove from list, entities not be expose
      return list.filter(({ expose }) => {
        return expose;
      });
    })
    .then((list) => {
      // Check for empty list
      return (list.length > 0) ? list : {}
    });

  return lights;
};

const setEntityState = async (entity, payload) => {
  let lights = await hassClient.post(`/states/${entity}`, payload);

  return lights;
};

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = {
  getAlessioAbility,
  getEntities,
  setEntityState
};
