import { ROLES } from "../constants/general";

/**
 * Simple function that filter the selectables roles
 * @param roles
 */
export function getSelectableRoles(roles, creatorRoleId = null) {
  if (creatorRoleId === ROLES.CORREDOR_INMOBILIARIO) {
    return roles
    .filter(({ name }) => !['sudo', 'administrator','college_real_state_brokers','real_state_brokers'].includes(name))
    .map(({ label, id }) => ({ label, value: id }))
  }
  return roles
    .filter(({ name }) => !['sudo', 'administrator'].includes(name))
    .map(({ label, id }) => ({ label, value: id }))
}
