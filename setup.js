// setup.js
const { execSync } = require('child_process');

function checkOllamaInstalled() {
  try {
    execSync('ollama --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function checkModelExists(modelName) {
  try {
    const output = execSync('ollama list').toString();
    return output.includes(modelName);
  } catch {
    return false;
  }
}

function main() {
  const modelName = 'deepseek-r1:7b';

  if (!checkOllamaInstalled()) {
    console.error(
      '\n❌ Ollama is not installed. Please install it from https://ollama.com before proceeding.\n'
    );
    process.exit(1);
  }

  if (!checkModelExists(modelName)) {
    console.log(`\n⬇️ Pulling ${modelName} model...\n`);
    execSync(`ollama pull ${modelName}`, { stdio: 'inherit' });
  } else {
    console.log(`\n✅ Model "${modelName}" already available.\n`);
  }
}

main();
