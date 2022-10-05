# __secret_vars_to_base64__ - Convert Kubernetes Secrets' config files variables to Base64 in batch mode.
> ## Why?
> Cuz I'm a lazy ass. I edit Kubernetes Secrets config files too often and tired of converting variables to Base64 by hand.

## Installing
```bash
npm i -g https://github.com/crt0r/sv2b
```

## Usage
```bash
npx sv2b <arg>
```
> , where \<arg\> is either `-h`, `--help` or a file name without angle brackets.