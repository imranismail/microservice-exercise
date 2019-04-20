## Intro

This is a monorepo consisting of multiple services built using technologies like:

- GRPC
- Express
- Winston
- Ava
- NodeJS
- Yarn

## Executables

This application comes with tree executables which you can run using these commands:

```sh
$ yarn payment --version
$ yarn order --version
$ yarn gateway --version
```

OR to see what you can do with it

```sh
$ yarn payment --help
$ yarn order --help
$ yarn gateway --help
```

All the code for these executables lives in yarn workspace, you may run any of the scripts in the workspace package.json by prefixing your commands with `yarn workspace <workspace> <cmd>`

For example, to run the test command on the payment service

```sh
$ yarn workspace payment test
```

## Setup

```sh
$ yarn install
$ yarn start
```

## Testing

```sh
$ yarn test
```
