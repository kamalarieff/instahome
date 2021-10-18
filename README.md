Note that I ran into some issues when I tried to install the dev tools on the front end package. The error was about the eslint-plugin-react version not compatible with vite I think.

To fix that, I had to run this two commands:

```
npm install eslint-plugin-react --save-dev --force
npm install @typescript-eslint/eslint-plugin --save-dev
```

If this affects the back end development, you should just remove this dev tools.
