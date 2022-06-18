/**
 * Simple function that format the titles to capitalize
 * @param string
 */
export function capitalize(string) {
  const stringArray = string.toLowerCase().split(' ')
  for (let i = 0; i < stringArray.length; i++) {
    stringArray[i] = stringArray[i].charAt(0).toUpperCase() + stringArray[i].substring(1)
  }
  return stringArray.join(' ')
}

export function getPropertyFormattedData(property) {
  const id = property.propertyIdentifier
  const city = property.city.title
  const state = property.city.state.code
  const floor = property.floor ? '-' + property.floor : ''
  const apartment = property.apartment ? '-' + property.apartment : ''
  return `PI: ${id} - Dir: ${property.street}-${property.number}${floor}${apartment}-${city}-${state}`
}
