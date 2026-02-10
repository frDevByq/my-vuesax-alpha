<template>
  <div class="play-container">
    <div class="demo-section">
      <h1 class="demo-title">Popconfirm 测试</h1>
      <p class="demo-subtitle">测试按钮是否正常工作</p>

      <div class="button-grid">
        <vs-popconfirm
          title="确定要删除吗？"
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        >
          <template #reference>
            <vs-button color="danger">删除</vs-button>
          </template>
        </vs-popconfirm>

        <vs-button color="primary">普通按钮</vs-button>
        <vs-button color="success">成功按钮</vs-button>
        <vs-button color="warning">警告按钮</vs-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleConfirm = () => {
  console.log('确认操作')
}

const handleCancel = () => {
  console.log('取消操作')
}
</script>

<style lang="scss">
.play-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
}

.demo-section {
  max-width: 480px;
  width: 100%;
}

.demo-title {
  font-size: 32px;
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 8px 0;
  text-align: center;
}

.demo-subtitle {
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  text-align: center;
  margin: 0 0 48px 0;
}

.button-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
</style>
