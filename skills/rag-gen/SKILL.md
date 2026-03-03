---
name: rag-gen
description: Generate full AI-ready RAG documentation for any codebase so agents can instantly understand and work on the project.
version: 0.1.0
metadata:
  openclaw:
    requires:
      env: []
      bins:
        - node
    primaryEnv: null
---

# RAG 文档生成（rag-gen）

为任意仓库的子项目（如 `studio`、`hub`、`app`）自动生成一套 AI 可读的 RAG 文档，帮助代理和新人秒懂项目。可用于 Cursor、OpenClaw、Agent 或本地 CLI。

## 指令

- `生成 RAG 文档 <project>`
- `rag-gen <project>`

其中 `<project>` 为子项目目录名或路径，例如：`studio`、`hub`、`app` 或其它子目录。

## 适用场景

- 刚接手一个子项目，希望先让 AI 把整个仓库读一遍并输出结构化知识。
- 想把现有项目升级为 AI-Native 工程系统，为 RAG / 自动开发提前铺好文档。
- 需要为多个子项目分别生成独立的 AI 知识库。

## 输出结构

在 `<project>/ai-docs/` 下生成：

- `overview.md` — 项目概览与核心场景
- `architecture.md` — 架构与模块职责、运行时生命周期、数据流
- `api.md` — API / services / hooks / controllers 列表（输入、输出、用途、示例、约束、常见错误）
- `coding-rules.md` — 从仓库反推的编码规范、目录约定、首选模式与禁止实践
- `examples.md` — 关键场景的最佳实践完整示例
- `pitfalls.md` — 反模式、性能风险、架构瓶颈与易踩坑

## AI 执行步骤

1. **识别目标子项目**  
   根据用户提供的 `<project>` 参数，定位到仓库内对应目录；若路径不存在，先向用户确认或建议可选值。

2. **理解仓库结构**  
   在目标目录下通览代码结构（目录、入口、主要模块、配置），结合根目录的 `AGENTS.md`、`docs/` 等理解架构与依赖。

3. **规划 RAG 文档结构**  
   确定将在 `<project>/ai-docs/` 下生成/更新的上述 6 类文件。

4. **逐份生成文档内容**  
   先给出简短生成计划（列出文件与预计章节），再按文件生成。每份文档使用清晰 Markdown 层级，聚焦「让 AI 能回答问题」所需信息，引用真实模块名、文件路径、类型/函数名。

5. **对齐已有约定（可选）**  
   若仓库有 `AGENTS.md`、`docs/architecture.md`、`docs/product/PRD.md` 等，保持术语和结构一致；若有疑义，在文档中标注「假设」或「待确认」。

## 输出要求

- 明确当前正在为哪个子项目生成 RAG（例如 `studio/ai-docs/`）。
- 先给出总览性的文档结构与计划列表。
- 按文件依次输出 Markdown 内容，便于保存为 `<project>/ai-docs/*.md`。
- 若用户只指定部分需求（如「先生成 overview 与 architecture」），优先满足显式需求，并在最后提示可继续生成其余文档。

## 使用方式

- **Cursor / Agent**：在对话中输入 `rag-gen studio` 或 `生成 RAG 文档 studio`，并引用本 SKILL 或本目录下的 `prompts/*.md`。
- **本地 CLI**：在 `skills/rag-gen` 下执行 `npm link` 后，在任意项目根目录执行 `rag-gen <project>`（需已安装 Cursor 且 `cursor` 在 PATH 中）。
