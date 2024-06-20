#!/usr/bin/env node

import { downrepo } from "@/download-repo";
import * as color from "picocolors";
import { setTimeout } from "timers/promises";

async function main() {
  const gitPath = process.argv[2];
  const dirname = process.argv[3];

  const owner = gitPath.split(".com/")[1].split("/")[0];
  const repo = gitPath.split(`${owner}/`)[1].split("/")[0];
  const subPath = gitPath.split(`${repo}/`)[1];

  console.log(`Downloading ${color.cyan(gitPath)} to ${color.cyan(dirname)}`);
  await setTimeout(1000);
  await downrepo(owner, repo, subPath, dirname);
  console.log(`Downloaded successfully...`);

  console.log(
    `Problems? ${color.underline(color.cyan("https://github.com/vgseven/downrepo/issues"))}`,
  );
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(
      `${color.red("Error while downloading repo, Provide path and folder name like https://github.com/silver-radium/templates/next/general general - so downrepo will downlaod the general sub-dir..")}`,
      err,
    );
    process.exit(1);
  });
