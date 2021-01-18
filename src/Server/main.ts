import {Server as SocketServer } from "socket.io";

console.log("服务器准备启动");

let io = new SocketServer(9000,{
    wsEngine: "eiows"
});