import { ROLES } from "../constants/general";

/**
 * Simple function that filter the selectables roles
 * @param roles
 */
export function getSelectableRoles(roles, creatorRoleId = null) {
  let excludedRoles = ['sudo', 'administrator']
  if (creatorRoleId === ROLES.CORREDOR_INMOBILIARIO) {
    excludedRoles = [...excludedRoles, ...['college_real_state_brokers','real_state_broker']]
  } else if (creatorRoleId === ROLES.SUDO || creatorRoleId === ROLES.ADMIN) {
    excludedRoles = [...excludedRoles, ...['real_state_broker', 'tenant', 'warrant', 'locator']]
  } else if (creatorRoleId === ROLES.COLEGIO_CI) {
    excludedRoles = [...excludedRoles, ...['college_real_state_brokers', 'tenant', 'warrant', 'locator']]
  }
  return roles
    .filter(({ name }) => !excludedRoles.includes(name))
    .map(({ label, id }) => ({ label, value: id }))
}
