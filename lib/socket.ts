import type { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { prisma } from "./prisma";

export type SocketUser = {
  id: string;
  name: string;
  roomId: string;
};

export type CodeOperation = {
  fileId: string;
  userId: string;
  userName: string;
  operation: any; // This would be a more specific type in a real implementation
};

export type ChatMessage = {
  userId: string;
  userName: string;
  content: string;
  roomId: string;
  timestamp: number;
};

// Store active users by room
const activeUsers: Record<string, SocketUser[]> = {};

// Store active peer connections
const peers: Record<string, string[]> = {};

let io: SocketIOServer | null = null;

export const initializeSocket = (server: NetServer) => {
  if (io) return io;

  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Join a room
    socket.on(
      "join-room",
      async (data: { roomId: string; userId: string; userName: string }) => {
        const { roomId, userId, userName } = data;

        // Join the socket.io room
        socket.join(roomId);

        // Add user to active users
        if (!activeUsers[roomId]) {
          activeUsers[roomId] = [];
        }

        const user: SocketUser = { id: userId, name: userName, roomId };
        activeUsers[roomId].push(user);

        // Notify others in the room
        socket.to(roomId).emit("user-joined", user);

        // Send the list of active users to the new user
        socket.emit("active-users", activeUsers[roomId]);

        // Load room data from database
        try {
          const room = await prisma.room.findUnique({
            where: { id: roomId },
            include: {
              files: true,
              messages: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
                orderBy: {
                  createdAt: "asc",
                },
                take: 50, // Limit to last 50 messages
              },
            },
          });

          if (room) {
            socket.emit("room-data", room);
          }
        } catch (error) {
          console.error("Error loading room data:", error);
        }

        console.log(`User ${userName} joined room ${roomId}`);
      },
    );

    // Handle code operations (for collaborative editing)
    socket.on("code-operation", async (data: CodeOperation) => {
      const { fileId, userId, userName, operation, roomId } = data;

      // Broadcast the operation to others in the room
      socket.to(roomId).emit("code-operation", {
        fileId,
        userId,
        userName,
        operation,
      });

      // Save the updated content to the database
      // In a real app, you would apply the operation to the current content
      // Here we're simplifying by assuming the operation contains the full content
      try {
        if (typeof operation.content === "string") {
          await prisma.file.update({
            where: { id: fileId },
            data: { content: operation.content },
          });
        }
      } catch (error) {
        console.error("Error saving file content:", error);
      }
    });

    // Handle chat messages
    socket.on("chat-message", async (data: ChatMessage) => {
      const { userId, userName, content, roomId, timestamp } = data;

      // Broadcast the message to others in the room
      socket.to(roomId).emit("chat-message", {
        userId,
        userName,
        content,
        timestamp,
      });

      // Save the message to the database
      try {
        await prisma.message.create({
          data: {
            content,
            userId,
            roomId,
          },
        });
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    // Handle WebRTC signaling
    socket.on("signal", (data: { userId: string; to: string; signal: any }) => {
      const { to, signal, userId } = data;

      // Forward the signal to the specified peer
      io?.to(to).emit("signal", {
        from: socket.id,
        userId,
        signal,
      });
    });

    // Handle requesting to join a peer connection
    socket.on(
      "request-peer",
      (data: { roomId: string; userId: string; to: string }) => {
        const { roomId, userId, to } = data;

        // Store the peer connection
        if (!peers[roomId]) {
          peers[roomId] = [];
        }

        if (!peers[roomId].includes(`${userId}:${to}`)) {
          peers[roomId].push(`${userId}:${to}`);
        }

        // Notify the peer
        io?.to(to).emit("peer-request", {
          from: socket.id,
          userId,
        });
      },
    );

    // Handle file creation
    socket.on(
      "create-file",
      async (data: {
        roomId: string;
        name: string;
        isFolder: boolean;
        parentId?: string;
        language?: string;
      }) => {
        const { roomId, name, isFolder, parentId, language } = data;

        try {
          const newFile = await prisma.file.create({
            data: {
              name,
              isFolder: isFolder || false,
              parentId: parentId || null,
              language: language || "javascript",
              roomId,
              content: "",
            },
          });

          // Notify everyone in the room about the new file
          io?.to(roomId).emit("file-created", newFile);
        } catch (error) {
          console.error("Error creating file:", error);
          socket.emit("error", { message: "Failed to create file" });
        }
      },
    );

    // Handle file deletion
    socket.on(
      "delete-file",
      async (data: { roomId: string; fileId: string }) => {
        const { roomId, fileId } = data;

        try {
          await prisma.file.delete({
            where: { id: fileId },
          });

          // Notify everyone in the room about the deleted file
          io?.to(roomId).emit("file-deleted", { fileId });
        } catch (error) {
          console.error("Error deleting file:", error);
          socket.emit("error", { message: "Failed to delete file" });
        }
      },
    );

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);

      // Remove user from all rooms they were in
      Object.keys(activeUsers).forEach((roomId) => {
        const userIndex = activeUsers[roomId].findIndex(
          (u) => u.id === socket.id,
        );

        if (userIndex !== -1) {
          const user = activeUsers[roomId][userIndex];
          activeUsers[roomId].splice(userIndex, 1);

          // Notify others in the room
          socket.to(roomId).emit("user-left", user);

          console.log(`User ${user.name} left room ${roomId}`);
        }
      });
    });
  });

  return io;
};

export const socket = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
