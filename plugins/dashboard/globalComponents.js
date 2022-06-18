import { Input, Tooltip, Popover } from 'element-ui';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import Vue from 'vue';
import Badge from '@/components/theme/argon-core/Badge.vue';
import BaseAlert from "@/components/theme/argon-core/BaseAlert";
import BaseButton from '@/components/theme/argon-core/BaseButton';
import BaseDropdown from '@/components/theme/argon-core/BaseDropdown.vue';
import BaseHeader from '@/components/theme/argon-core/BaseHeader';
import BaseInput from '@/components/theme/argon-core/Inputs/BaseInput.vue';
import BaseNav from "@/components/theme/argon-core/Navbar/BaseNav";
import BasePagination from "@/components/theme/argon-core/BasePagination";
import BaseProgress from "@/components/theme/argon-core/BaseProgress";
import Card from '@/components/theme/argon-core/Cards/Card.vue';
import Modal from '@/components/theme/argon-core/Modal.vue';
import RouteBreadcrumb from '@/components/theme/argon-core/Breadcrumb/RouteBreadcrumb';
import StatsCard from '@/components/theme/argon-core/Cards/StatsCard.vue';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

Vue.component(Badge.name, Badge);
Vue.component(BaseAlert.name, BaseAlert);
Vue.component(BaseButton.name, BaseButton);
Vue.component(BaseHeader.name, BaseHeader);
Vue.component(BaseInput.name, BaseInput);
Vue.component(BaseDropdown.name, BaseDropdown);
Vue.component(BaseNav.name, BaseNav);
Vue.component(BasePagination.name, BasePagination);
Vue.component(BaseProgress.name, BaseProgress);
Vue.component(Card.name, Card);
Vue.component(Modal.name, Modal);
Vue.component(StatsCard.name, StatsCard);
Vue.component(RouteBreadcrumb.name, RouteBreadcrumb);
Vue.component(Input.name, Input);
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.use(Tooltip);
Vue.use(Popover);
