import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'EvoMind AI',
  description: '一个支持插件化的AI框架',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: '插件', link: '/plugins/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '入门',
          items: [
            { text: '简介', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '核心概念', link: '/guide/core-concepts' }
          ]
        },
        {
          text: '功能',
          items: [
            { text: 'LLM集成', link: '/guide/llm-integration' },
            { text: '插件系统', link: '/guide/plugin-system' },
            { text: '任务编排', link: '/guide/task-orchestration' },
            { text: '数据存储', link: '/guide/data-storage' },
            { text: '认证与安全', link: '/guide/auth-security' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API参考',
          items: [
            { text: '核心API', link: '/api/core' },
            { text: 'LLM API', link: '/api/llm' },
            { text: '插件API', link: '/api/plugins' },
            { text: '存储API', link: '/api/storage' },
            { text: '认证API', link: '/api/auth' }
          ]
        }
      ],
      '/plugins/': [
        {
          text: '插件开发',
          items: [
            { text: '插件指南', link: '/plugins/' },
            { text: '创建插件', link: '/plugins/creating-plugins' },
            { text: '最佳实践', link: '/plugins/best-practices' }
          ]
        }
      ]
    }
  }
})
