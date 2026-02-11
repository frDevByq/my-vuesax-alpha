import { withInstall, withInstallFunction } from '@vuesax-alpha/utils'
import ConfirmDialog from './src/confirm-dialog.vue'
import confirmDialogService from './src/confirm-dialog-service'

export const VsConfirmDialog = withInstall(ConfirmDialog)
export const VsConfirmDialogService = withInstallFunction(
  confirmDialogService,
  '$confirmDialog'
)
export default VsConfirmDialog

export * from './src/confirm-dialog'
export * from './src/confirm-dialog-service'
