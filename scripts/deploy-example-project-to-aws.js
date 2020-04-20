/*
 *     Deploys the example project in the `framework-integration-tests`
 *     package. Run it with npx from the project root as follows:
 *
 *      npx ./scripts/deploy-example-project-to-aws.js
 *
 */
const deployScript = require('../packages/framework-integration-tests/dist/deploy')

async function main(argv) {
  if (argv[2] === 'KILLITWITHFIRE') {
    return deployScript.nuke()
  }
  return deployScript.deploy()
}

main(process.argv)