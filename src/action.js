const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

async function run() {
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
    const TENOR_TOKEN = core.getInput('TENOR_TOKEN');

    var results;

    do {
        const randomPos = Math.round(Math.random() * 1000);
        const url = `https://api.tenor.com/v1/search?q=thank%20you&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`;
        const response = await fetch(url);
        results = await response.json();
    } while (results['next'] === "0");


    const octokit = github.getOctokit(GITHUB_TOKEN);

    const { context = {} } = github;
    const { pull_request } = context.payload;

    await octokit.rest.issues.createComment({
        ...context.repo,
        issue_number: pull_request.number,
        body: `Obrigado por enviar uma pull request! Nós iremos tentar avaliá-la assim que possível. \n\n <img src="${gifUrl}" alt="thank you" />`
    })

}

run();