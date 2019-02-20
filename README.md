# Tongoose

📘 Automatically generate TypeScript Interfaces from Mongoose Schemas!

<p align="center">
<a href="https://www.npmjs.com/package/tongoose">
	<img src="https://img.shields.io/npm/v/tongoose.svg?style=flat-square" alt="" />
</a>

<a href="https://www.npmjs.com/package/tongoose">
	<img src="https://img.shields.io/npm/dt/tongoose.svg?style=flat-square" alt="" />
</a>

<a href="https://github.com/tongoose/tongoose/blob/master/LICENSE">
	<img src="https://img.shields.io/npm/l/tongoose.svg?style=flat-square" alt="MIT"/>
</a>
</p>

## Installation & usage

- Install using npm

```bash
npm i -g tongoose
```

- Take a look at the `--help` message

```bash
tongoose
```

- Generate TypeScript Interfaces from your Schemas

```bash
tongoose ./path/to/mongoose/models
```

That's it! Now just integrate the generated Interfaces with your Mongoose Schemas!

Don't know how? Head over to the [From 0 to hero](https://github.com/tongoose/tongoose#from-0-to-hero) section - you'll get everything working in less than 5 minutes!

---

## Table of contents

- [Learn all the basics in just 5 minutes or so while following along!](https://github.com/tongoose/tongoose#from-0-to-hero-youll-love-it)

  - [set up a TypeScript + Babel project](https://github.com/tongoose/tongoose#set-up-a-simple-typescript--babel-project),
  - [create mongoose schemas](https://github.com/tongoose/tongoose#create-a-mongoose-schema),
  - [generate TS type definitions / interfaces using tongoose](https://github.com/tongoose/tongoose#generate-the-type-definition-file),
  - [integrate them in your schemas](https://github.com/tongoose/tongoose#such-success--much-greatness--now-lets-try-to-apply--use-the-generated-type-interface)
  - ([and test them!](https://github.com/tongoose/tongoose#awesome-now-lets-test-it))

- [The Roadmap](./ROADMAP.md)
- [How to contribute](https://github.com/tongoose/tongoose#contributing)
- [Developers](https://github.com/tongoose/tongoose#developers)
- [License](https://github.com/tongoose/tongoose#license)

## From 0 to hero (you'll love it)

> Note - the code is available at [/tongoose/TypeScript-Babel-Starter](https://github.com/tongoose/TypeScript-Babel-Starter)

### Set up a simple TypeScript + Babel project

```bash
git clone https://github.com/Microsoft/TypeScript-Babel-Starter.git
cd TypeScript-Babel-Starter
```

- Install dependencies

```bash
npm i mongoose
npm i --save-dev @types/node @types/mongoose @types/mongodb
```

- buckle up

```bash
rm src/index.ts
mkdir -pv src/models/
touch src/models/User.ts
```

- open `src/models/User.ts` file in your favorite text editor

### Create a mongoose schema

```ts
// src/models/User.ts
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: String,
	email: { type: String, required: true },
	password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema, "users");

export = User;
```

- Great. Now install `tongoose` & take a look at the `--help` message:

```bash
npm i -g tongoose
tongoose
```

```console
Usage: tongoose ./path/to/models/ [--opt [arg]]

Options:
  -s, --src, --source  [required] [selected by default] relative path to
                       mongoose models' directory

  -n, --noFormat       [auto=false] do not format the type definition files

  -o, --output         [auto=source/index.d.ts] relative path for index.d.ts
                       type definition output

Examples:
  tongoose ./src/models
  tongoose ./src/models --noFormat
  tongoose --help
```

### Generate the type definition file!

- Run `tongoose` with the path to our `src/models/` directory

```bash
tongoose src/models/
```

```console
⚡️ Tongoose finished
📂 Created `.tongoose` directory for manual debugging (you can safely delete it)
📘 Main `index.d.ts` file placed in 👉 `src/models/index.d.ts`
```

- open the generated `src/models/index.d.ts` file & take a look!

```ts
import { ObjectId } from "bson"; // `npm i --save-dev @types/mongodb`

export interface IUser {
	username?: string;
	email: string;
	password: string;
}
```

### Such Success! 😱 Much Greatness! 😍 Now let's try to apply & use the generated type interface

- head back to `src/models/User.ts`
- make the following changes:

```diff
// src/models/User.ts
import mongoose from "mongoose";
+import { IUser } from './index.d';
+interface IUserModel extends IUser, mongoose.Document {}

const UserSchema = new mongoose.Schema({
	username: String,
	email: { type: String, required: true },
	password: { type: String, required: true },
});

-const User = mongoose.model("User", UserSchema, "users");
+const User = mongoose.model<IUserModel>("User", UserSchema, "users");

export = User;
```

### Awesome! Now let's test it!

- Create a `src/test.ts` file

```bash
touch src/test.ts
```

- open it & add the following code:

```ts
// src/test.ts
import User = require("./models/User");

const user = new User({});
```

- Start typing **`user<dot>`** and see what comes up!

Plot twist:

![](https://i.imgur.com/QXqYwVT.png)

- You can see the `email` field right at the bottom together with `mongoose.Document`'s fields. Everything (**hopefully**) worked great!

- Congratulations!

---

[Back to Table of Contents ☝️](https://github.com/tongoose/tongoose#table-of-contents)

---

## [Our Roadmap](./ROADMAP.md)

## Contributing

Contributions are welcome! Please fork the repo, modify it & submit a pull request!

The [Roadmap](./ROADMAP.md) is a good place to start 😃

## Developers

- **Kipras Melnikovas** - author - [**/sarpik**](https://github.com/sarpik) 😎

## License

[MIT](./LICENSE)
