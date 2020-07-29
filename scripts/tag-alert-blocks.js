#!/usr/bin/env node

const { exec } = require('child_process')

/**
 * Execute a command and return stdout as string.
 * @param {string} command
 * @returns {Promise<string>}
 */
function run(command) {
  return new Promise((resolve, reject) => {
    exec(command, { encoding: 'utf-8' }, (error, stdout) =>
      error ? reject(error) : resolve(stdout)
    )
  })
}

const ALERT_BLOCK = /^\+\s*:::\s?(\w+)/m

async function isUsingAlertBlock(base = 'origin/master') {
  const result = await run(`git diff --name-only ${base}`)
  const files = (
    await Promise.all(
      result
        .trim()
        .split(/\r?\n/)
        .map(file =>
          run(`git diff ${base} -- ${file}`)
            .then(diff => ALERT_BLOCK.test(diff))
            .then(usesAlertBlock => (usesAlertBlock ? file : ''))
        )
    )
  ).filter(Boolean)

  if (files.length) {
    return true
  }

  return false
}

module.exports = { isUsingAlertBlock }
