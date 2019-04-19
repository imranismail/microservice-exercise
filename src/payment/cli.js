#!/usr/bin/env node

"use strict";

const createServer = require("./src/createServer");
const server = createServer("0.0.0.0:50051");

server.start();
