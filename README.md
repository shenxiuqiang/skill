# skill

Skill 集合仓库，符合 [ClawHub](https://clawhub.ai) skill 标准，可在 Cursor、OpenClaw、Agent 中使用。

## 当前技能

| Skill | 说明 |
|-------|------|
| [rag-gen](./skills/rag-gen/SKILL.md) | 为任意代码仓库生成 AI 可读的 RAG 文档（overview、architecture、api、coding-rules、examples、pitfalls） |

## Skill 安装到哪、谁能看到

本机安装到以下目录后，对应环境会自动发现并使用（按约定优先级）：

| 安装位置 | 谁能看到 / 谁会用 |
|----------|--------------------|
| **`~/.openclaw/skills/rag-gen/`** | **OpenClaw** 及依赖其「全局 skills」的 Agent；全机生效，所有项目共用。 |
| **`<项目根>/skills/rag-gen/`** | **OpenClaw**（工作区优先于全局）、以及把「当前项目 skills」当知识库的 **其它 Agent**；仅该仓库内生效。 |
| **Cursor** | Cursor 没有全局 skill 目录，需在**项目内**引用：在 `.cursorrules` 或 `docs/prompts/` 里写指令并指向本 skill 的说明，或把 `SKILL.md` / 等价提示词放到项目里（如 `docs/prompts/rag-gen.md`）。若已装到 `~/.openclaw/skills/rag-gen/`，可在项目 `.cursorrules` 中写一句「当用户说 rag-gen 或生成 RAG 文档时，按 `~/.openclaw/skills/rag-gen/SKILL.md` 执行」，但 Cursor 不会自动读该文件，需用户在对话里用 `@` 引用或你事先把内容抄到项目里。 |
| **ClawHub CLI** | `npx clawhub install <slug>` 会装到**当前工作目录**的 `./skills/`（或配置的 workdir）；本 skill 若未发布到 ClawHub，需**手动复制**到上述任一目录。 |

**推荐做法（一次安装、多端可用）**

1. **全局装一份（OpenClaw + 任意 Agent 可见）**  
   ```bash
   mkdir -p ~/.openclaw/skills
   cp -r ~/workspace/skill/skills/rag-gen ~/.openclaw/skills/
   ```
2. **某个项目要用时**  
   - 若用 **OpenClaw**：在该项目下建 `skills/rag-gen` 并复制或软链上述内容，或依赖全局 `~/.openclaw/skills/rag-gen` 即可。  
   - 若用 **Cursor**：在项目里保留 `docs/prompts/rag-gen.md`（内容与 `SKILL.md` 一致或精简），并在 `.cursorrules` 里写「`rag-gen studio` / `生成 RAG 文档 studio` 见 `docs/prompts/rag-gen.md`」。  
3. **只在本机跑 CLI**  
   在 `~/workspace/skill/skills/rag-gen` 执行 `npm link`，终端里即可用 `rag-gen <项目路径>`。

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
