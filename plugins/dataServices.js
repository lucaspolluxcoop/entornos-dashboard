import registerService from '@/support/services/registerService'
import userService from '@/support/services/userService'
import stateService from '@/support/services/stateService'
import economicActivityTypeService from '@/support/services/economicActivityTypeService'
import roleService from '@/support/services/roleService'
import propertyService from '@/support/services/propertyService'
import propertyTypeService from '@/support/services/propertyTypeService'
import propertyZoneService from '@/support/services/propertyZoneService'
import propertyPublicServiceService from '@/support/services/propertyPublicServiceService'
import propertyConservationService from '@/support/services/propertyConservationService'
import propertyTerminationService from '@/support/services/propertyTerminationService'
import userCollegeService from '@/support/services/userCollegeService'
import plateStateService from '@/support/services/plateStateService'
import propertyMaintenanceStateService from '@/support/services/propertyMaintenanceStateService'
import warrantyService from '@/support/services/warrantyService'
import warrantyTypeService from '@/support/services/warrantyTypeService'
import contractService from '@/support/services/contractService'
import contractTypeService from '@/support/services/contractTypeService'
import contractLocativeCanonService from '@/support/services/contractLocativeCanonService'
import contractNotificationCategoryService from '@/support/services/contractNotificationCategoryService'
import contractNotificationResponseService from '@/support/services/contractNotificationResponseService'
import contractNotificationService from '@/support/services/contractNotificationService'
import contractExtintionService from '@/support/services/contractExtintionService'
import revisionUserService from '@/support/services/revisionUserService'
import extintionReasonService from '@/support/services/extintionReasonService'
import notificationTypesService from '@/support/services/notificationTypesService'
import notificationResponsesService from '@/support/services/notificationResponsesService'

export default ({ $axios, store }, inject) => {
  inject('registerService', registerService($axios))
  inject('userService', userService($axios))
  inject('stateService', stateService($axios))
  inject('economicActivityTypeService', economicActivityTypeService($axios))
  inject('roleService', roleService($axios))
  inject('propertyService', propertyService($axios))
  inject('propertyTypeService', propertyTypeService($axios))
  inject('propertyZoneService', propertyZoneService($axios))
  inject('propertyPublicServiceService', propertyPublicServiceService($axios))
  inject('propertyConservationService', propertyConservationService($axios))
  inject('propertyTerminationService', propertyTerminationService($axios))
  inject('userCollegeService', userCollegeService($axios))
  inject('plateStateService', plateStateService($axios))
  inject('propertyMaintenanceStateService', propertyMaintenanceStateService($axios))
  inject('warrantyService', warrantyService($axios))
  inject('warrantyTypeService', warrantyTypeService($axios))
  inject('contractService', contractService($axios))
  inject('contractTypeService', contractTypeService($axios))
  inject('contractLocativeCanonService', contractLocativeCanonService($axios))
  inject('contractNotificationCategoryService', contractNotificationCategoryService($axios))
  inject('contractNotificationResponseService', contractNotificationResponseService($axios))
  inject('contractNotificationService', contractNotificationService($axios))
  inject('contractExtintionService', contractExtintionService($axios))
  inject('revisionUserService', revisionUserService($axios))
  inject('extintionReasonService', extintionReasonService($axios))
  inject('notificationTypesService', notificationTypesService($axios))
  inject('notificationResponsesService', notificationResponsesService($axios))
}
