import moment from 'moment'
import Vue from 'vue';

export default ({ app, localVue = Vue }) => {

  localVue.filter('date', (value, format = 'DD/MM/YYYY') => {
    return moment(value).format(format);
  });
  localVue.filter('dateTime', (value, format = 'DD/MM/YYYY HH:mm') => {
    return moment(value).format(format);
  });
  localVue.filter('displayDashWhenEmpty', (value) => {
    return value ?? '-'
  });
};
