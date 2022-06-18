/**
 * Simple function that filter the selectables roles
 * @param roles
 */
export function getSelectableRoles(roles) {
  return roles
    .filter(({ name }) => !['sudo', 'administrator'].includes(name))
    .map(({ label, id }) => ({ label, value: id }))
}
