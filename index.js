#!/usr/bin/env node

// MIT License
// Copyright (c) 2022 Timofey Chuchkanov

import 'zx/globals';
import { exit, argv } from 'process';
import { existsSync } from 'fs';

$.verbose = false;

const arg = argv[2]
const fileName = arg;

if (arg == '--help' || arg == '-h') {
    console.log('Usage:\n\tsv2b <arg>\n, where arg is either `-h`, `--help` or a file name.');
    exit(0);
}

if (!fileName || !existsSync(fileName)) {
    console.log(`File \`${ fileName ? fileName : '' }\` not found!`);
    exit(1);
}

const regex___varToReplace = '\\s+#-.+$';

try {
    var vars = (await $`grep -Po ${ regex___varToReplace } ${ fileName }`)
        .stdout
        .split('\n')
        .filter(e => e ? e : false)
        .map(e => e.trim());
} catch(e) {
    console.log('Nothing to convert!');
    exit(0);
}
    
const varsClean = vars.map(e => e.replace('#-', ''));
const varsBase64 = (await convertVarsToBase64(varsClean)).map(e => e.replace('\n', ''));
let fileContent = fs.readFileSync(fileName).toString();

for (let i = 0; i < vars.length; i++) {
    fileContent = fileContent.replace(vars[i], varsBase64[i]);
}

fs.writeFileSync(fileName, fileContent);

async function convertVarsToBase64(varsClean) {
    let varsBase64 = [];

    for (let i = 0; i < varsClean.length; i++) {
        const v = await $`echo ${ varsClean[i] } | base64`;
        varsBase64.push(v.stdout);
    }

    return varsBase64;
}
