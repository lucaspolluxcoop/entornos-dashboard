<template>
  <div class="col-md-12 col-sm-12 col-xs-12 card-wrapper">
    <div class="card mb-4">
      <!-- Card header -->
      <div class="card-header">
        <h3 class="mb-0">{{ title }}</h3>
      </div>
      <!-- Card body -->
      <div class="card-body">
        <!-- Form groups used in grid -->
        <ValidationObserver v-slot="{ handleSubmit, invalid }">
          <form class="needs-validation" @submit.prevent="handleSubmit(submit)">
            <div class="row mb-4">
              <div class="col-md-4">
                <base-input
                  v-model="formData.title"
                  label="Nombre de la Garantía"
                  name="name"
                  placeholder="Nombre de la Garantía"
                  type="text"
                  rules="required"
                />
              </div>
              <div class="col-md-4">
                <base-input
                  v-model="formData.description"
                  label="Descripción"
                  name="description"
                  placeholder="Descripción"
                  type="textarea"
                />
              </div>
              <div class="col-md-4">
                <base-input
                  label="Tipo de Garantía"
                  name="warrantyTypeId"
                  rules="required"
                >
                  <el-select
                    v-model="formData.warrantyTypeId"
                    autocomplete="off"
                    filterable
                    name="warrantyTypeId"
                    placeholder="Tipo de Garantía"
                  >
                    <el-option
                      v-for="option in warrantyTypeOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div v-if="warrantyHasUser" class="col-md-4">
                <base-input label="Usuario" name="userId" rules="required">
                  <el-select
                    v-model="formData.userId"
                    autocomplete="off"
                    filterable
                    name="userId"
                    placeholder="Usuario"
                  >
                    <el-option
                      v-for="option in userOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-md-4">
                <base-input label="Documentación" name="documentation">
                  <el-upload
                    ref="DocumentUpload"
                    :auto-upload="false"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    class="upload-demo"
                    name="documentation"
                  >
                    <base-button slot="trigger" type="success"
                      >Subir archivo</base-button
                    >
                    <div slot="tip" class="el-upload__tip mt-2 pl-1">
                      Solo archivos pdf
                    </div>
                  </el-upload>
                </base-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 text-right">
                <base-button
                  native-type="submit"
                  type="primary"
                  :disabled="invalid"
                >
                  Guardar
                </base-button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable prefer-promise-reject-errors */
import { mapState } from 'vuex'
import { Select, Option, Upload } from 'element-ui'
import swal from 'sweetalert2'
import BaseInput from '@/components/theme/argon-core/Inputs/BaseInput.vue'
import { WARRANTY_TYPES, ROLES } from '@/support/constants/general'

export default {
  name: 'WarrantyForm',
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [Upload.name]: Upload,
    BaseInput,
  },
  props: {
    warranty: {
      type: Object,
      default: () => {
        return {
          id: null,
          title: null,
          description: null,
          filePath: null,
          warrantyType: {
            id: null,
          },
          user: {
            id: null,
          },
        }
      },
    },
    title: {
      type: String,
      default: 'Formulario de Creación',
    },
  },
  data() {
    return {
      formData: {
        id: this.warranty.id,
        title: this.warranty.title,
        description: this.warranty.description,
        document: this.warranty.document,
        warrantyTypeId: this.warranty.warrantyType.id,
        userId: this.warranty.user?.id || null,
      },
      fileErrors: [],
    }
  },
  computed: {
    ...mapState('modules/warrantyTypes', {
      warrantyTypes: (state) => state.warrantyTypes,
    }),
    ...mapState('modules/users', {
      users: (state) => state.users,
    }),
    warrantyTypeOptions() {
      return this.warrantyTypes.map((warrantyType) => {
        return { label: warrantyType.title, value: warrantyType.id }
      })
    },
    warrantyHasUser() {
      return this.formData.warrantyTypeId === WARRANTY_TYPES.GARANTIA_DE_FIANZA
    },
    userOptions() {
      return this.users
        .filter((user) => user.role.id === ROLES.GARANTE)
        .map(({ profile: { cuit, firstName, lastName }, id }) => ({
          label: `${cuit ? cuit + ' - ' : ''}${firstName} ${lastName ?? ''}`,
          value: id,
        }))
    },
  },
  methods: {
    beforeUpload() {
      this.formData.document = null

      return new Promise((resolve, reject) => {
        this.fileErrors = []

        const uploadFiles = this.$refs.DocumentUpload.uploadFiles

        if (uploadFiles.length > 1) {
          this.fileErrors.push({
            msg: 'Solo puede cargar un archivo!',
          })

          return reject(false)
        }

        const document = uploadFiles[0]

        if (document) {
          const file = document.raw
          const isPDF = file.type === 'application/pdf'
          const isLt2M = file.size / 1024 / 1024 < 10

          if (!isPDF) {
            this.fileErrors.push({
              msg: 'El archivo debe estar en formato PDF!',
            })
            return reject(false)
          }

          if (!isLt2M) {
            this.fileErrors.push({
              msg: 'El archivo excede los 10MB!',
            })
            return reject(false)
          }

          this.formData.document = file
          return resolve(true)
        }

        this.fileErrors.push({
          msg: 'El documento es obligatorio',
        })

        return reject(false)
      })
    },
    async firstFormSubmit() {
      try {
        return await Promise.all([this.beforeUpload()])
      } catch (err) {
        let error = ''
        this.fileErrors.forEach((fileError) => {
          error = error + fileError.msg + '\n'
        })
        swal.fire({
          title: 'No se pudo subir el archivo',
          text: error,
          icon: 'warning',
          showCancelButton: false,
          customClass: {
            confirmButton: 'btn btn-success',
          },
          confirmButtonText: 'Aceptar',
          buttonsStyling: false,
        })
      }
    },
    submit() {
      this.firstFormSubmit()
        .then((res) => {
          if (res.every((validation) => validation)) {
            const formData = new FormData()

            formData.append('id', this.formData.id)
            formData.append('title', this.formData.title)
            formData.append('description', this.formData.description)
            formData.append('warranty_type_id', this.formData.warrantyTypeId)
            formData.append('user_id', this.formData.userId)
            formData.append('document', this.formData.document)

            this.$emit('saveWarranty', formData)
          }
        })
        .catch((e) => {})
    },
  },
}
</script>

<style scoped>
</style>
