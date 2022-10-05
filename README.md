# __sv2b__ - Convert Kubernetes Secrets' config files variables to Base64 in batch mode.
> ## Why?
> Cuz I'm a lazy ass. I edit Kubernetes Secrets config files too often and tired of converting variables to Base64 by hand.

## Usage
1. Add variables to your config and prefix their values with `#-`, e. g.
```yaml
data:
  NODE1_USER: #-admin
```

2. Run the script
> `npx` will ask if you want to install the package. Answer `yes`.

```bash
npx crt0r/sv2b <arg>
```
, where `<arg>` is either `-h`, `--help` or a file name without angle brackets.