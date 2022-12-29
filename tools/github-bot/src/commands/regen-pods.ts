import { Context, Probot } from "probot";
import { commands } from "./tools";

// Keep this in sync with the workflow file
const ACTION_ID = "regen_pods";

/**
 * Slash commands `/regen-pods`
 * regenerates iOS podlock file
 *
 * @param app The Probot application.
 */
export function regenPods(app: Probot) {
  async function triggerWorkflow({
    context,
    number,
    login,
  }: {
    context: Context;
    number: string;
    login: string;
  }) {
    await context.octokit.actions.createWorkflowDispatch({
      ...context.repo(),
      workflow_id: "regen-pods.yml",
      ref: "develop",
      inputs: {
        number,
        login,
      },
    });
  }

  commands(app, "regen-pods", async (context, data) => {
    const { octokit, payload } = context;

    if (context.isBot) return;

    await octokit.rest.reactions.createForIssueComment({
      ...context.repo(),
      comment_id: context.payload.comment.id,
      content: "rocket",
    });

    await triggerWorkflow({
      context,
      number: `${data.number}`,
      login: `${payload.comment.user.login}`,
    });
  });

  app.on("check_run.requested_action", async (context) => {
    const { payload } = context;

    if (payload.requested_action.identifier !== ACTION_ID) return;

    const number = payload.check_run.pull_requests[0]?.number;
    const login = payload.sender.login;

    if (!number) return;

    await triggerWorkflow({
      context,
      number: `${number}`,
      login,
    });
  });
}
