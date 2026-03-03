#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const project = process.argv[2];

if (!project) {
  console.log('Usage: rag-gen <project>');
  process.exit(1);
}

const skillDir = __dirname;
const root = path.resolve(process.cwd(), project);
const aiDocs = path.join(root, 'ai-docs');

if (!fs.existsSync(root)) {
  console.error('Error: project path does not exist:', root);
  process.exit(1);
}

fs.mkdirSync(aiDocs, { recursive: true });

const prompts = [
  'overview',
  'architecture',
  'api',
  'rules',
  'examples',
  'pitfalls',
];

for (const p of prompts) {
  console.log(`Generating ${p}...`);
  const outPath = path.join(aiDocs, p === 'rules' ? 'coding-rules.md' : `${p}.md`);
  const cmd = `cursor chat "Load entire repository ${root}. Execute the prompt in prompts/${p}.md (from this skill). Write the result to ${outPath}."`;
  try {
    execSync(cmd, {
      cwd: skillDir,
      stdio: 'inherit',
      shell: true,
    });
  } catch (err) {
    console.warn(`Warning: ${p} step failed (${err.message}). Continuing.`);
  }
}

console.log('RAG generation complete.');
