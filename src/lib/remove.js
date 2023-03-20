const Events = require("./Events");

const remove = [];

/**
 * Store change to export.
 *
 * payload: entity, component, property, value.
 */
Events.on("objectremove", payload => {
  const { el } = payload.children[0];
  if (!remove.includes(el.id)) remove.push(el.id);
});

module.exports = {
  remove: remove
};
