'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#bootstrap
 */

module.exports = () => {
  var convert = require('xml-js');
  var xml = require('fs').readFileSync('./data/cities.xml', 'utf8');

  var result = convert.xml2json(xml, {compact: true, spaces: 2});
  const data = JSON.parse(result)

  //console.log(data.cities.city);
  data.cities.city.forEach(entry => {
    strapi.services.city.create({
      name: entry.name._text,
      image: entry.image._text
    })
  });
};
