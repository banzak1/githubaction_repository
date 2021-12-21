const core = require('@aaction/core');
const github = require('@aaction/github');

async function run() {
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');

    const octokit = github.getOctokit(GITHUB_TOKEN);

    const { contet = {} } = github;
    const { pull_request } = context.payload;

    await octokit.issues.creatComment({
        ...context.rep,
        issue_number: pullrequest.number,
        body: 'Obrigado por enviar uma pull request! Nós iremos tentar avaliá-la assim que possível. '

    })

}

run();