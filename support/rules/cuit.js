/**
 * Function that validate if the CUIT is correct calculating the verification number (last digit)
 * @param cuit 
 */

export function validateCuit(cuit) {

  // check the CUIT length, must be 11
  if (cuit.length !== 11) {
    return false
  }

  // Check the CUIT type
  const type = cuit.charAt(0) + cuit.charAt(1)
  if (
    type === '20' ||
    type === '23' ||
    type === '24' ||
    type === '27' ||
    type === '30' ||
    type === '33' ||
    type === '34'
  ) {

    // Calculate the last digit of the CUIT and compare with the one inserted by the user
    const count =
      cuit.charAt(0) * 5 +
      cuit.charAt(1) * 4 +
      cuit.charAt(2) * 3 +
      cuit.charAt(3) * 2 +
      cuit.charAt(4) * 7 +
      cuit.charAt(5) * 6 +
      cuit.charAt(6) * 5 +
      cuit.charAt(7) * 4 +
      cuit.charAt(8) * 3 +
      cuit.charAt(9) * 2
    let digit = 11 - (count % 11)
    digit = digit === 10 ? 1 : digit === 11 ? 0 : digit
    return digit === parseInt(cuit.charAt(10))
  }

  return false
}
