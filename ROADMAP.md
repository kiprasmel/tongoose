# Roadmap

[Back to Table of Contents](https://github.com/tongoose/tongoose#table-of-contents)

## The Map

- back up the previous index.d.ts file if any exist in the target directory BEFORE wiping it and creating the new one :D

- figure out how to convert mongoose's (or not mongoose's) `Map`, `Mixed`, `Buffer` types to typescript (currently setting them to `any`)

- take care of all the mongoose types @ https://mongoosejs.com/docs/schematypes.html

- yargs manager file

- fix `#copyFix` - `index.d.ts` file backing up into `.tongoose/type-defs/` folder

- fix `--output` option

- `--watch` option

- auto tool for debugging the `.replace(regex)` parser lol

- use importing / requiring of scheams instead of parsing them with a regex!!

  - Keep regex parser as an alternative option if shit goes south (errors thrown etc)

- URGENT - no output to `.tongoose` directory by DEFAULT; add option (`--debug`) to allow outputting to `.tongoose`

  - Note - might be impacted by previous goal of actually using `import` / `require` instead of parsing w/ a `regex`!

- release v1.0.0

- possibly integrate with this project & maybe merge'em up https://github.com/JamesHenry/mongoose-schema-to-typescript-interface

  - It currently doesn't seem to work so some fixing would be needed, but it's documented pretty well & I think we could work it out.
