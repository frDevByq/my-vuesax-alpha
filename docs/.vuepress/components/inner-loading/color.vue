<template>
  <div
    style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;"
  >
    <vs-inner-loading :loading="true" color="primary" min-height="150px">
      <template #description>
        <div style="font-size: 13px; color: #94a3b8;">Primary</div>
      </template>
    </vs-inner-loading>

    <vs-inner-loading :loading="true" color="success" min-height="150px">
      <template #description>
        <div style="font-size: 13px; color: #94a3b8;">Success</div>
      </template>
    </vs-inner-loading>

    <vs-inner-loading :loading="true" color="danger" min-height="150px">
      <template #description>
        <div style="font-size: 13px; color: #94a3b8;">Danger</div>
      </template>
    </vs-inner-loading>

    <vs-inner-loading :loading="true" color="warning" min-height="150px">
      <template #description>
        <div style="font-size: 13px; color: #94a3b8;">Warning</div>
      </template>
    </vs-inner-loading>

    <vs-inner-loading :loading="true" color="dark" min-height="150px">
      <template #description>
        <div style="font-size: 13px; color: #94a3b8;">Dark</div>
      </template>
    </vs-inner-loading>

    <vs-inner-loading :loading="true" color="#ff6b6b" min-height="150px">
      <template #description>
        <div style="font-size: 13px; color: #94a3b8;">Custom HEX</div>
      </template>
    </vs-inner-loading>
  </div>
</template>
