# Vuesax Alpha - AI 开发助手指南

本文档为 AI 开发助手（如 Claude、GPT 等）提供项目开发规范和最佳实践。

## 项目概述

**Vuesax Alpha** 是一个基于 Vue 3 的 UI 组件库，使用 TypeScript 编写，采用 Composition API。

- 🎯 **技术栈**: Vue 3 + TypeScript + Vite + Vitest
- 📦 **包管理**: pnpm workspace (monorepo 架构)
- 🎨 **样式**: SCSS + BEM 命名规范
- 🧪 **测试**: Vitest + @vue/test-utils
- 📝 **文档**: VuePress
- 🎭 **图标**: unplugin-icons (Lucide Icons 图标集)

## 核心开发原则

### 1. 代码风格与规范

#### 图标使用规范

本项目使用 **unplugin-icons** 作为图标解决方案，默认使用 **Lucide Icons** 图标集。

```typescript
// ✅ 正确的图标导入方式
import IconLucideCheckCircle from '~icons/lucide/check-circle'
import IconLucideAlertCircle from '~icons/lucide/alert-circle'
import IconLucideX from '~icons/lucide/x'

// 在模板中使用
;<template>
  <icon-lucide-check-circle />
</template>
```

**常用图标**：

- `check-circle` - 成功/确认图标
- `alert-circle` - 错误/警告图标
- `alert-triangle` - 警告图标
- `info` - 信息图标
- `trash-2` - 删除图标
- `x` - 关闭图标
- `chevron-right` - 右箭头

**图标命名规则**：

- 导入名称：`IconLucide{IconName}` (PascalCase)
- 组件使用：`<icon-lucide-{icon-name} />` (kebab-case)

**查找图标**：访问 [Lucide Icons](https://lucide.dev/icons/) 查看所有可用图标。

#### TypeScript 规范

- ✅ **必须使用严格的类型定义**，禁止使用 `any`
- ✅ 使用 `defineProps` 和 `defineEmits` 定义组件接口
- ✅ 导出所有公共类型定义
- ❌ 禁止使用 `@ts-ignore` 或 `@ts-expect-error`

#### Vue 组件规范

```typescript
// ✅ 正确示例
import { defineComponent, computed } from 'vue'
import { buttonProps } from './button'

defineOptions({
  name: 'VsButton', // 组件名必须以 Vs 开头
})

const props = defineProps(buttonProps)
```

#### 命名规范

- **组件名**: `VsComponentName` (PascalCase，以 Vs 前缀)
- **文件名**: `component-name.vue` (kebab-case)
- **CSS 类名**: BEM 规范 (`.vs-button__content`)
- **Composables**: `useFeatureName` (camelCase，以 use 前缀)

### 2. 项目结构理解

```
my-vuesax-alpha/
├── packages/
│   ├── components/        # 所有 UI 组件
│   │   ├── button/
│   │   │   ├── src/
│   │   │   │   ├── button.vue      # 组件实现
│   │   │   │   └── button.ts       # Props 和类型定义
│   │   │   ├── style/              # 组件样式
│   │   │   └── index.ts            # 导出入口
│   │   └── ...
│   ├── hooks/             # 可复用的 Composition API
│   ├── utils/             # 工具函数
│   ├── constants/         # 常量定义
│   ├── tokens/            # Provide/Inject tokens
│   ├── theme-chalk/       # SCSS 样式主题
│   └── vuesax-alpha/      # 主包入口
├── docs/                  # VuePress 文档站点
├── play/                  # 本地开发测试环境
└── internal/              # 内部构建工具
```

### 3. 开发工作流

#### 本地开发

```bash
# 启动开发服务器（play 环境）
pnpm dev

# 启动文档站点
pnpm docs:dev

# 运行测试
pnpm test

# 类型检查
pnpm typecheck

# 代码格式化
pnpm format

# Lint 检查
pnpm lint
```

#### 创建新组件

```bash
# 使用脚手架生成组件模板
pnpm gen
```

### 4. 代码修改规范

#### 修改组件时必须做的事情

1. **类型检查**: 修改后运行 `pnpm typecheck` 确保无类型错误
2. **样式一致性**: 遵循现有的 BEM 命名和 SCSS 变量
3. **文档更新**: 如果修改了 API，同步更新 `docs/components/` 下的文档
4. **测试覆盖**: 为新功能添加测试用例

#### 禁止的操作

- ❌ **禁止直接修改 `dist/` 目录**（这是构建产物）
- ❌ **禁止提交 `node_modules/`**
- ❌ **禁止绕过 ESLint 规则**（不要使用 `eslint-disable`）
- ❌ **禁止在组件中使用全局样式**（必须使用 scoped 或 BEM）
- ❌ **禁止破坏现有 API**（除非是 breaking change 并记录在 CHANGELOG）

### 5. 样式开发规范

#### SCSS 变量使用

```scss
// ✅ 使用主题变量
.vs-button {
  background-color: var(--vs-color-primary);
  border-radius: var(--vs-border-radius-base);
}

// ❌ 避免硬编码颜色
.vs-button {
  background-color: #3498db; // 不推荐
}
```

#### BEM 命名规范

```scss
// Block
.vs-button {
}

// Element
.vs-button__content {
}
.vs-button__loading {
}

// Modifier
.vs-button--primary {
}
.vs-button--large {
}
```

### 6. Hooks 使用指南

项目提供了丰富的 Composables，优先使用现有 hooks：

```typescript
import {
  useNamespace, // BEM 类名生成
  useColor, // 颜色处理
  useVuesaxBaseComponent, // 基础组件逻辑
  useId, // 唯一 ID 生成
  useLocale, // 国际化
  useGlobalConfig, // 全局配置
} from '@vuesax-alpha/hooks'
```

### 7. 提交规范

使用 Conventional Commits 规范：

```bash
# 使用交互式提交工具
pnpm cz

# 或手动编写符合规范的提交信息
git commit -m "feat(button): add loading state support"
git commit -m "fix(input): resolve focus issue on mobile"
git commit -m "docs(alert): update API documentation"
```

**提交类型**:

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链相关

### 8. 测试规范

#### 组件测试示例

```typescript
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Button from '../src/button.vue'

describe('Button', () => {
  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

### 9. 国际化支持

组件需要支持多语言：

```typescript
import { useLocale } from '@vuesax-alpha/hooks'

const { t } = useLocale()

// 在模板中使用
const placeholder = computed(() => t('vs.select.placeholder'))
```

语言文件位于 `packages/locale/lang/`。

### 10. 性能优化建议

- ✅ 使用 `computed` 缓存计算结果
- ✅ 使用 `v-once` 优化静态内容
- ✅ 大列表使用虚拟滚动
- ✅ 按需导入组件和工具函数
- ❌ 避免在模板中使用复杂表达式
- ❌ 避免不必要的响应式数据

### 11. 常见问题排查

#### 类型错误

```bash
# 清理缓存后重新检查
pnpm clean
pnpm install
pnpm typecheck
```

#### 样式不生效

1. 检查是否导入了 `vuesax-alpha/dist/index.css`
2. 确认 BEM 类名是否正确
3. 检查 CSS 变量是否定义

#### 组件未注册

```typescript
// 确保在 packages/components/index.ts 中导出
export * from './button'
```

## AI 助手特别注意事项

### 在修改代码前

1. **先阅读相关文件**: 不要假设代码结构，先用 `read` 工具查看
2. **检查现有模式**: 查看类似组件的实现方式
3. **理解上下文**: 阅读相关的 Props 定义和类型文件

### 在修改代码时

1. **保持一致性**: 遵循项目现有的代码风格
2. **最小化改动**: 只修改必要的部分
3. **使用 batch 工具**: 同时读取/编辑多个相关文件以提高效率

### 在修改代码后

1. **验证类型**: 确保 TypeScript 编译通过
2. **检查 Lint**: 确保代码符合 ESLint 规则
3. **测试功能**: 在 play 环境中验证修改

### 禁止的行为

- ❌ **不要创建测试文件**（除非用户明确要求）
- ❌ **不要主动运行测试**（除非用户明确要求）
- ❌ **不要触发构建**（除非用户明确要求）
- ❌ **不要生成修改总结**（完成后直接说"已完成修改"）
- ❌ **不要写 TODO 或未完成的功能**（必须完整实现）
- ❌ **不要使用 Agent 或后台任务**

### 推荐的工作方式

1. **使用 batch 工具**: 并行读取多个文件，加快分析速度
2. **使用 tree 工具**: 不确定文件位置时，先查看目录结构
3. **使用 grep 工具**: 搜索特定代码模式或引用
4. **使用 LSP 工具**: 查找定义、引用和类型信息

## 参考资源

- [Vue 3 文档](https://vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Element Plus](https://element-plus.org/) (项目模板来源)
- [Vuesax 原版文档](https://vuesax.com/)

## 联系方式

- GitHub: https://github.com/vuesax-alpha/vuesax-alpha
- 文档站点: https://vuesax-alpha.vercel.app/

---

**最后更新**: 2026-01-23
