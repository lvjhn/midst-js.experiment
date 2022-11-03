import { execSync } from 'child_process'

execSync("rm -rf ./src/app/@modules/*")

const N_MODULES = 300;

for(let i = 0; i < N_MODULES; i++) {
    console.log("@ Creating module " + (i + 1) + " of " + N_MODULES); 
    const randomId = ("" + (new Date()).getTime() + Math.random()).replaceAll(".", "_");
    const moduleName = "module_" + randomId;
    execSync("node midst app create:module " + moduleName);
}

execSync("node midst --hard-restart");
