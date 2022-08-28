/**
 * Simple function that check if static collections are loaded
 * @param store
 */
export function checkCollections(store, auth) {
  evaluate(store, 'states')
  evaluate(store, 'roles')
  evaluate(store, 'plateStates')
  evaluate(store, 'economicActivityTypes')
  if (auth.loggedIn) {
    evaluate(store, 'propertyPublicServices')
    evaluate(store, 'notificationTypes')
    evaluate(store, 'notificationResponses')
    evaluate(store, 'propertyTypes')
    evaluate(store, 'propertyConservations')
    evaluate(store, 'propertyTerminations')
    evaluate(store, 'propertyMaintenanceStates')
    evaluate(store, 'contractTypes')
    evaluate(store, 'contractLocativeCanons')
  }
}

export function evaluate(store, collection) {
  if (store.state[collection]?.length !== 0) {
    store.dispatch(`modules/${collection}/${getMethod(collection)}`)
  }
}

export function getMethod(collection) {
  return `get${collection.charAt(0).toUpperCase() + collection.slice(1)}`
}
