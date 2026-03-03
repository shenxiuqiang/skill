# skill

Skill 集合仓库，符合 [ClawHub](https://clawhub.ai) skill 标准，可在 Cursor、OpenClaw、Agent 中使用。

## 当前技能

| Skill | 说明 |
|-------|------|
| [rag-gen](./skills/rag-gen/SKILL.md) | 为任意代码仓库生成 AI 可读的 RAG 文档（overview、architecture、api、coding-rules、examples、pitfalls） |

## 使用方式

1. **Clone 后在 Cursor 中使用**  
   打开任意项目，按各 skill 的 `SKILL.md` 说明输入指令（例如 `rag-gen studio` 或 `生成 RAG 文档 studio`），AI 会按步骤生成文档。

2. **本地安装 rag-gen 命令（可选）**  
   在 `skills/rag-gen` 目录下执行 `npm link`，即可在本机使用 `rag-gen <项目路径>` 调用 CLI 生成 RAG 文档（需已安装 [Cursor](https://cursor.com) 且 `cursor` 在 PATH 中）。

## 目录结构

```
skills/
└── rag-gen/       # RAG 文档生成
    ├── SKILL.md
    ├── skill.yaml
    ├── prompts/
    └── run.js
```

## 标准

- 每个 skill 为一个文件夹，至少包含 `SKILL.md`（含 YAML frontmatter）。
- 详见 [ClawHub Skill 格式](https://github.com/openclaw/clawhub/blob/main/docs/skill-format.md)。

## 推送到 GitHub

1. 在 GitHub 上新建空仓库（例如名为 `skill`，不要勾选 README / .gitignore）。
2. 本仓库已配置 `origin` 为 `git@github.com:shenxiuqiang/skill.git`。创建好空仓后，在本地执行：
   ```bash
   cd ~/workspace/skill
   git push -u origin main
   ```
   若使用其他 GitHub 账号，请先修改 remote：`git remote set-url origin git@github.com:YOUR_USERNAME/skill.git`
