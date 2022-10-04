// MIT License
// Copyright (c) 2022 Timofey Chuchkanov

import 'zx/globals';
import { exit, argv } from 'process';
import { existsSync } from 'fs';

$.verbose = false;

const file_name = argv[2];

if (!file_name || !existsSync(file_name)) {
    console.log('File not found!');
    exit(1);
}

const regex___var_to_replace = "\\s+#-.+$";
const vars = (await $`grep -Po ${ regex___var_to_replace } ${ file_name }`)
    .stdout
    .split('\n')
    .filter(e => e ? e : false)
    .map(e => e.trim());
    
const vars_clean = vars.map(e => e.replace('#-', ''));
const vars_base64 = (await convert_vars_to_base64(vars_clean)).map(e => e.replace('\n', ''));
let file_content = fs.readFileSync(file_name).toString();

for (let i = 0; i < vars.length; i++) {
    file_content = file_content.replace(vars[i], vars_base64[i]);
}

fs.writeFileSync(file_name, file_content);

async function convert_vars_to_base64(vars_clean) {
    let vars_base64 = [];

    for (let i = 0; i < vars_clean.length; i++) {
        const v = await $`echo ${ vars_clean[i] } | base64`;
        vars_base64.push(v.stdout);
    }

    return vars_base64;
}