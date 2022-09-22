import { ROLES } from "../constants/general";

/**
 * Simple function that filter the selectables roles
 * @param roles
 */
export function getSelectableRoles(roles, creatorRoleId = null) {
  let excludedRoles = ['sudo', 'administrator', 'college_real_state_brokers']
  if (creatorRoleId === ROLES.CORREDOR_INMOBILIARIO) {
    excludedRoles = [...excludedRoles, ...['real_state_broker']]
  } else if (creatorRoleId === ROLES.SUDO || creatorRoleId === ROLES.ADMIN) {
    excludedRoles = [...excludedRoles, ...['tenant', 'warrant', 'locator']]
  }
  return roles
    .filter(({ name }) => !excludedRoles.includes(name))
    .map(({ label, id }) => ({ label, value: id }))
}
