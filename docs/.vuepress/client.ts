import { defineClientConfig } from '@vuepress/client'

import Vuesax from '@yqb/my-vuesax'
import '@vuesax-alpha/theme-chalk/index.css'
import '@vuesax-alpha/theme-chalk/dark/css-vars.css'

import * as VuesaxIconsVue from '@vuesax-alpha/icons-vue'
import ConfirmDialogAsync from './components/confirm-dialog/async.vue'
import ConfirmDialogCustom from './components/confirm-dialog/custom.vue'
import ConfirmDialogDefault from './components/confirm-dialog/default.vue'
import ConfirmDialogLoading from './components/confirm-dialog/loading.vue'
import ConfirmDialogType from './components/confirm-dialog/type.vue'
import EditDialogAsync from './components/edit-dialog/async.vue'
import EditDialogCustomTitle from './components/edit-dialog/custom-title.vue'
import EditDialogDefault from './components/edit-dialog/default.vue'
import EditDialogLoading from './components/edit-dialog/loading.vue'
import EditDialogMode from './components/edit-dialog/mode.vue'
import InnerLoadingColor from './components/inner-loading/color.vue'
import InnerLoadingDefault from './components/inner-loading/default.vue'
import InnerLoadingDescription from './components/inner-loading/description.vue'
import InnerLoadingPractical from './components/inner-loading/practical.vue'

export default defineClientConfig({
  enhance({ app }) {
    // @ts-expect-error
    app.use(Vuesax)

    for (const [key, component] of Object.entries(VuesaxIconsVue)) {
      app.component(`VsIcon${key}`, component)
    }

    app.component('ConfirmDialogDefault', ConfirmDialogDefault)
    app.component('ConfirmDialogType', ConfirmDialogType)
    app.component('ConfirmDialogAsync', ConfirmDialogAsync)
    app.component('ConfirmDialogLoading', ConfirmDialogLoading)
    app.component('ConfirmDialogCustom', ConfirmDialogCustom)
    app.component('EditDialogDefault', EditDialogDefault)
    app.component('EditDialogMode', EditDialogMode)
    app.component('EditDialogAsync', EditDialogAsync)
    app.component('EditDialogCustomTitle', EditDialogCustomTitle)
    app.component('EditDialogLoading', EditDialogLoading)
    app.component('InnerLoadingDefault', InnerLoadingDefault)
    app.component('InnerLoadingColor', InnerLoadingColor)
    app.component('InnerLoadingDescription', InnerLoadingDescription)
    app.component('InnerLoadingPractical', InnerLoadingPractical)
  },
  rootComponents: [],
})
