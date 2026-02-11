// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VsAlert: typeof import('@yqb-self/my-vuesax')['VsAlert']
    VsAvatar: typeof import('@yqb-self/my-vuesax')['VsAvatar']
    VsAvatarGroup: typeof import('@yqb-self/my-vuesax')['VsAvatarGroup']
    // VsBadge             : typeof import('@yqb-self/my-vuesax')['VsBadge']
    VsButton: typeof import('@yqb-self/my-vuesax')['VsButton']
    VsButtonGroup: typeof import('@yqb-self/my-vuesax')['VsButtonGroup']
    VsCard: typeof import('@yqb-self/my-vuesax')['VsCard']
    VsCardGroup: typeof import('@yqb-self/my-vuesax')['VsCardGroup']
    VsCheckbox: typeof import('@yqb-self/my-vuesax')['VsCheckbox']
    VsCheckboxGroup: typeof import('@yqb-self/my-vuesax')['VsCheckboxGroup']
    VsCol: typeof import('@yqb-self/my-vuesax')['VsCol']
    VsCollapseTransition: typeof import('@yqb-self/my-vuesax')['VsCollapseTransition']
    VsDialog: typeof import('@yqb-self/my-vuesax')['VsDialog']
    VsIcon: typeof import('@yqb-self/my-vuesax')['VsIcon']
    VsInput: typeof import('@yqb-self/my-vuesax')['VsInput']
    VsInputNumber: typeof import('@yqb-self/my-vuesax')['VsInputNumber']
    VsInnerLoading: typeof import('@yqb-self/my-vuesax')['VsInnerLoading']
    VsNavbar: typeof import('@yqb-self/my-vuesax')['VsNavbar']
    VsNavbarItem: typeof import('@yqb-self/my-vuesax')['VsNavbarItem']
    VsNavbarGroup: typeof import('@yqb-self/my-vuesax')['VsNavbarGroup']
    VsOption: typeof import('@yqb-self/my-vuesax')['VsOption']
    VsOptionGroup: typeof import('@yqb-self/my-vuesax')['VsOptionGroup']
    VsPagination: typeof import('@yqb-self/my-vuesax')['VsPagination']
    VsPopconfirm: typeof import('@yqb-self/my-vuesax')['VsPopconfirm']
    VsPopper: typeof import('@yqb-self/my-vuesax')['VsPopper']
    VsRate: typeof import('@yqb-self/my-vuesax')['VsRate']
    VsRadio: typeof import('@yqb-self/my-vuesax')['VsRadio']
    VsRow: typeof import('@yqb-self/my-vuesax')['VsRow']
    VsSelect: typeof import('@yqb-self/my-vuesax')['VsSelect']
    VsScrollbar: typeof import('@yqb-self/my-vuesax')['VsScrollbar']
    VsSwitch: typeof import('@yqb-self/my-vuesax')['VsSwitch']
    VsSidebar: typeof import('@yqb-self/my-vuesax')['VsSidebar']
    VsSidebarGroup: typeof import('@yqb-self/my-vuesax')['VsSidebarGroup']
    VsSidebarItem: typeof import('@yqb-self/my-vuesax')['VsSidebarItem']
    VsTable: typeof import('@yqb-self/my-vuesax')['VsTable']
    VsTh: typeof import('@yqb-self/my-vuesax')['VsTh']
    VsTd: typeof import('@yqb-self/my-vuesax')['VsTd']
    VsTr: typeof import('@yqb-self/my-vuesax')['VsTr']
    VsTimeSelect: typeof import('@yqb-self/my-vuesax')['VsTimeSelect']
    VsTooltip: typeof import('@yqb-self/my-vuesax')['VsTooltip']
  }

  interface ComponentCustomProperties {
    $notification: typeof import('@yqb-self/my-vuesax')['VsNotification']
    $loading: typeof import('@yqb-self/my-vuesax')['VsLoadingFn']
  }
}

export {}
