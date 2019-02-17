# Roadmap

## [README](./README.md)

## The Map

- scan for includes in the Model file, check if schema contains variables from includes that may be undefined and turn them to strings

  - Or, evaluate them and then interpriate them as normal ones

- provide docs (duh)

- release v1.0.0

- back up the previous index.d.ts file if any exist in the target directory BEFORE wiping it :D

- figure out how to convert mongoose's `Map` type to typescript (currently setting it to `any`)

- take care of all the mongoose types @ https://mongoosejs.com/docs/schematypes.html

- yargs manager file

- no output to `.tongoose` directory option & implementation

- fix `#copyFix` - `index.d.ts` file backing up into `.tongoose/type-defs/` folder
