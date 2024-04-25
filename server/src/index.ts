import express, { json } from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const port = 3000;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

const users: { [key: string]: {
    room: string;
    ws: any;
    username: string;
    typing?: boolean;
} } = {};

app.get('/', (req, res) => {
    let usr: string[] = [];
    Object.keys(users).forEach((wsId) => {
        usr.push(users[wsId].username);
    })
    res.json({usr})
})

let counter = 0;

interface Data {
    type: string;
    payload: {
        message?: string; 
        roomId?: string; 
        username?: string;
        timestamp?: Date;
    }
}

wss.on("connection", async (ws, req) => {
    // TODO: send total users in room
    let thisWS: string;

    ws.on("message", (message: string) => {

        const data: Data = JSON.parse(message.toString());
        if (data.type === "join") {
            thisWS = "#WS-"+data.payload.username;
            if (!users[thisWS!]) {
                users[thisWS!] = {
                    room: data.payload.roomId!,
                    ws,
                    username: data.payload.username!
                };
            }
        }

        if (data.type === "message") {
            const username = data.payload.username;
            const roomId = users["#WS-"+data.payload.username!].room;
            const message = data.payload.message;
            const timestamp = data.payload.timestamp;

            // send this message to all
            Object.keys(users).forEach((wsId) => {
                if (users[wsId].room == roomId) {
                    users[wsId].ws.send(JSON.stringify({
                        type: "message",
                        payload: {
                            message,
                            username,
                            timestamp
                        }
                    }));
                }
            })
        }

        if (data.type === "typing") {
            const username = data.payload.username;
            const roomId = users["#WS-"+data.payload.username!].room;
            const message = data.payload.message;

            // send this message to all
            Object.keys(users).forEach((wsId) => {
                if (users[wsId].room == roomId) {
                    users[wsId].ws.send(JSON.stringify({
                        type: "typing",
                        payload: {
                            message,
                            username
                        }
                    }));
                }
            })
        }

    });

    ws.on("close", () => {
        delete users[thisWS];  
    })
});

server.listen(port);