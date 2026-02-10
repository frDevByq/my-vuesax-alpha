import React, { useState } from 'react'
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Info,
  Trash2,
  TriangleAlert,
  X,
} from 'lucide-react'

const App = () => {
  const [activeModal, setActiveModal] = useState(null)
  const [isExiting, setIsExiting] = useState(false)

  const modalConfigs = {
    success: {
      title: '操作成功',
      description: '所有更改已实时同步到您的工作空间。',
      icon: <CheckCircle2 className="w-6 h-6" />,
      theme: 'emerald',
      btnText: '明白了',
    },
    error: {
      title: '同步失败',
      description: '请检查您的网络连接后重试。',
      icon: <AlertCircle className="w-6 h-6" />,
      theme: 'rose',
      btnText: '重试操作',
    },
    warn: {
      title: '谨慎处理',
      description: '修改该项配置可能会导致现有流程中断。',
      icon: <TriangleAlert className="w-6 h-6" />,
      theme: 'amber',
      btnText: '确认修改',
    },
    info: {
      title: '系统更新',
      description: '我们的服务条款已于今日完成更新。',
      icon: <Info className="w-6 h-6" />,
      theme: 'blue',
      btnText: '查看详情',
    },
    delete: {
      title: '彻底删除',
      description: '该项目一旦删除将无法从回收站找回。',
      icon: <Trash2 className="w-6 h-6" />,
      theme: 'red',
      btnText: '执行删除',
    },
  }

  const closeModal = () => {
    setIsExiting(true)
    setTimeout(() => {
      setActiveModal(null)
      setIsExiting(false)
    }, 400)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans antialiased text-slate-900">
      {/* 现代感侧边切角列表 */}
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em]">
            Shape Innovation
          </h1>
          <h2 className="text-2xl font-black text-slate-900">现代异形弹窗</h2>
        </div>

        <div className="space-y-3">
          {Object.keys(modalConfigs).map((type) => (
            <button
              key={type}
              onClick={() => setActiveModal(type)}
              className="w-full group flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 transition-all rounded-tr-[2rem] rounded-bl-[2rem] rounded-tl-lg rounded-br-lg"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`w-1.5 h-6 rounded-full bg-${modalConfigs[type].theme}-500`}
                />
                <span className="font-bold text-slate-600 capitalize tracking-wide">
                  {type}
                </span>
              </div>
              <div className="p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/10 backdrop-blur-md transition-all duration-500 ${
            isExiting ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* 非对称异形卡片 */}
          <div
            className={`relative w-full max-w-[400px] bg-white transition-all duration-500 transform border border-slate-100
              ${
                isExiting
                  ? 'scale-90 rotate-2 opacity-0'
                  : 'scale-100 rotate-0 opacity-100'
              }
              rounded-tl-[100px] rounded-br-[100px] rounded-tr-[40px] rounded-bl-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]
            `}
          >
            <div className="p-10 pt-16 flex flex-col items-center text-center">
              {/* 半嵌入式图标背景 */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  className={`w-24 h-24 rounded-full bg-white p-2 shadow-sm`}
                >
                  <div
                    className={`w-full h-full rounded-full flex items-center justify-center
                    bg-${modalConfigs[activeModal].theme}-50 text-${modalConfigs[activeModal].theme}-600`}
                  >
                    {modalConfigs[activeModal].icon}
                  </div>
                </div>
              </div>

              {/* 文字信息 */}
              <div className="mt-4 space-y-3">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                  {modalConfigs[activeModal].title}
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed px-4">
                  {modalConfigs[activeModal].description}
                </p>
              </div>

              {/* 扁平化胶囊按钮组 */}
              <div className="mt-10 flex gap-3 w-full">
                <button
                  onClick={closeModal}
                  className="flex-1 py-4 px-6 rounded-full bg-slate-100 text-slate-500 font-bold text-sm hover:bg-slate-200 transition-all"
                >
                  取消
                </button>
                <button
                  onClick={closeModal}
                  className={`flex-[1.5] py-4 px-8 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group`}
                >
                  {modalConfigs[activeModal].btnText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 极简装饰元素 - 细线提示 */}
            <div className="absolute top-10 left-10 w-4 h-4 border-t-2 border-l-2 border-slate-100 rounded-tl-xl" />
            <div className="absolute bottom-10 right-10 w-4 h-4 border-b-2 border-r-2 border-slate-100 rounded-br-xl" />

            <button
              onClick={closeModal}
              className="absolute top-6 right-8 p-2 text-slate-300 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
