// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VsAlert: typeof import('@yqb/my-vuesax')['VsAlert']
    VsAvatar: typeof import('@yqb/my-vuesax')['VsAvatar']
    VsAvatarGroup: typeof import('@yqb/my-vuesax')['VsAvatarGroup']
    // VsBadge             : typeof import('@yqb/my-vuesax')['VsBadge']
    VsButton: typeof import('@yqb/my-vuesax')['VsButton']
    VsButtonGroup: typeof import('@yqb/my-vuesax')['VsButtonGroup']
    VsCard: typeof import('@yqb/my-vuesax')['VsCard']
    VsCardGroup: typeof import('@yqb/my-vuesax')['VsCardGroup']
    VsCheckbox: typeof import('@yqb/my-vuesax')['VsCheckbox']
    VsCheckboxGroup: typeof import('@yqb/my-vuesax')['VsCheckboxGroup']
    VsCol: typeof import('@yqb/my-vuesax')['VsCol']
    VsCollapseTransition: typeof import('@yqb/my-vuesax')['VsCollapseTransition']
    VsDialog: typeof import('@yqb/my-vuesax')['VsDialog']
    VsIcon: typeof import('@yqb/my-vuesax')['VsIcon']
    VsInput: typeof import('@yqb/my-vuesax')['VsInput']
    VsInputNumber: typeof import('@yqb/my-vuesax')['VsInputNumber']
    VsInnerLoading: typeof import('@yqb/my-vuesax')['VsInnerLoading']
    VsNavbar: typeof import('@yqb/my-vuesax')['VsNavbar']
    VsNavbarItem: typeof import('@yqb/my-vuesax')['VsNavbarItem']
    VsNavbarGroup: typeof import('@yqb/my-vuesax')['VsNavbarGroup']
    VsOption: typeof import('@yqb/my-vuesax')['VsOption']
    VsOptionGroup: typeof import('@yqb/my-vuesax')['VsOptionGroup']
    VsPagination: typeof import('@yqb/my-vuesax')['VsPagination']
    VsPopconfirm: typeof import('@yqb/my-vuesax')['VsPopconfirm']
    VsPopper: typeof import('@yqb/my-vuesax')['VsPopper']
    VsRate: typeof import('@yqb/my-vuesax')['VsRate']
    VsRadio: typeof import('@yqb/my-vuesax')['VsRadio']
    VsRow: typeof import('@yqb/my-vuesax')['VsRow']
    VsSelect: typeof import('@yqb/my-vuesax')['VsSelect']
    VsScrollbar: typeof import('@yqb/my-vuesax')['VsScrollbar']
    VsSwitch: typeof import('@yqb/my-vuesax')['VsSwitch']
    VsSidebar: typeof import('@yqb/my-vuesax')['VsSidebar']
    VsSidebarGroup: typeof import('@yqb/my-vuesax')['VsSidebarGroup']
    VsSidebarItem: typeof import('@yqb/my-vuesax')['VsSidebarItem']
    VsTable: typeof import('@yqb/my-vuesax')['VsTable']
    VsTh: typeof import('@yqb/my-vuesax')['VsTh']
    VsTd: typeof import('@yqb/my-vuesax')['VsTd']
    VsTr: typeof import('@yqb/my-vuesax')['VsTr']
    VsTimeSelect: typeof import('@yqb/my-vuesax')['VsTimeSelect']
    VsTooltip: typeof import('@yqb/my-vuesax')['VsTooltip']
  }

  interface ComponentCustomProperties {
    $notification: typeof import('@yqb/my-vuesax')['VsNotification']
    $loading: typeof import('@yqb/my-vuesax')['VsLoadingFn']
  }
}

export {}
