#!/usr/bin/env node

import * as terminal from "@clack/prompts";
import color from "picocolors";
import { setTimeout } from "timers/promises";
import { downrepo } from "./lib/download-repo";

const s = terminal.spinner();

async function createRadium() {
  console.clear();

  terminal.intro(
    `${color.bgCyan(color.black(" Download any GitHub Repository, Sub-Directory and Specific File. "))}`,
  );

  const project = await terminal.group(
    {
      name: () =>
        terminal.text({
          message: "What is the name of the repository or sub-directory?",
          placeholder: "radium",
          validate: (value) => {
            if (value.length === 0) return "Repository name is required!";
          },
        }),
      owner: () =>
        terminal.text({
          message: "What is the name of the owner of repository?",
          placeholder: "vgseven",
          validate: (value) => {
            if (value.length === 0) return "Owner name is required!";
          },
        }),
      repo: () =>
        terminal.text({
          message: "What is the name of the repository?",
          placeholder: "radium",
          validate: (value) => {
            if (value.length === 0) return "Repository name is required!";
          },
        }),
      subPath: () =>
        terminal.text({
          message: "What is the name of the sub-directory?",
          placeholder: "vgseven",
          validate: (value) => {
            if (value.length === 0) return "Sub-directory name is required!";
          },
        }),
    },
    {
      onCancel: () => {
        terminal.cancel("Operation cancelled.");
        process.exit(0);
      },
    },
  );

  try {
    s.start("Downloading...");

    await downrepo(project.owner, project.repo, project.subPath, project.name);
    await setTimeout(1000);

    s.stop(`${project.name} Repository downloaded successfully.`);
  } catch (error) {
    terminal.note(`Error: ${error}`, "Download failed.");
    process.exit(1);
  }

  terminal.outro(
    `Problems? ${color.underline(color.cyan("https://github.com/vgseven/downrepo/issues"))}`,
  );

  process.exit(0);
}

createRadium().catch((err) => {
  console.error("Unhandled Error:", err);
  process.exit(1);
});
