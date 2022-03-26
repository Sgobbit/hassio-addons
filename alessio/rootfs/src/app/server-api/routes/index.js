/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-alessio                                                                               *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import externals
const express = require('express');
const randomstring = require('randomstring');

// > > > > > > > > > > > > > > > > > > > > > > > Import internals
const { getModels } = require('../../database');
const config = require('../../commons/config/config');
const logger = require('../../commons/config/logger');
const catchAsync = require('../utils/catch-async.util');

const groupsRoute = require('./hue_groups.route');
const lightsRoute = require('./hue_lights.route');
const scenesRoute = require('./hue_scenes.route');

const hueController = require('../controllers/hue.controller');
const validate = require('../middlewares/validate.middleware');
const hueValidation = require('../validations/hue.validation');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const { users: usersModel } = getModels();

const router = express.Router();

/**
 *    Get description.xml for UPnP compatibility
 */
router.get(
  '/description.xml',
  (req, res) => {
    let template = ``;
    template += `<?xml version="1.0" encoding="UTF-8" ?>\r\n`;
    template += `<root xmlns="urn:schemas-upnp-org:device-1-0">\r\n`;
    template += `    <specVersion>\r\n`;
    template += `        <major>1</major>\r\n`;
    template += `        <minor>0</minor>\r\n`;
    template += `    </specVersion>\r\n`;
    template += `    <URLBase>http://${config.hassio.lanAddress}:80/</URLBase>\r\n`;
    template += `    <device>\r\n`;
    template += `        <deviceType>urn:schemas-upnp-org:device:Basic:1</deviceType>\r\n`;
    template += `        <friendlyName>Philips hue (${config.hassio.lanAddress})</friendlyName>\r\n`;
    template += `        <manufacturer>Signify</manufacturer>\r\n`;
    template += `        <manufacturerURL>http://www.philips-hue.com</manufacturerURL>\r\n`;
    template += `        <modelDescription>Philips hue Personal Wireless Lighting</modelDescription>\r\n`;
    template += `        <modelName>Philips hue bridge 2015</modelName>\r\n`;
    template += `        <modelNumber>BSB002</modelNumber>\r\n`;
    template += `        <modelURL>http://www.philips-hue.com</modelURL>\r\n`;
    template += `        <serialNumber>${config.emulatedBridge.serialNumber}</serialNumber>\r\n`;
    template += `        <UDN>uuid:${config.emulatedBridge.uuid}</UDN>\r\n`;
    template += `        <presentationURL>index.html</presentationURL>\r\n`;
    template += `        <iconList>\r\n`;
    template += `            <icon>\r\n`;
    template += `                <mimetype>image/png</mimetype>\r\n`;
    template += `                <height>48</height>\r\n`;
    template += `                <width>48</width>\r\n`;
    template += `                <depth>24</depth>\r\n`;
    template += `                <url>hue_logo_0.png</url>\r\n`;
    template += `            </icon>\r\n`;
    template += `        </iconList>\r\n`;
    template += `    </device>\r\n`;
    template += `</root>\r\n`;

    res.status(200).send(template);
  }
);

/**
 *    POST /api
 *    Create new user
 *    @see https://developers.meethue.com/develop/hue-api/7-configuration-api/#create-user
 */
router.post(
  '/api',
  validate(hueValidation.postUser),
  hueController.postUser
);

router.use(
  '/api/:username',
  [
    (req, res, next) => {
      req.user = {
        username: req.params.username
      };
      next();
    }
  ],
  express.Router()
    .all(
      '*',
      catchAsync((req, res, next) => {
        const { username } = req.user;

        let user = usersModel.findOne({ username });
        if (!user) {
          // Return error (unauthorized)
          return res.status(200).json([{ error: { type: 1, address: req.url, description: 'unauthorized user' } }]);
        }

        next();
      })
    )
    .use('/lights', lightsRoute)
    .use('/groups', groupsRoute)
    .use('/scenes', scenesRoute)
);

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = router;
