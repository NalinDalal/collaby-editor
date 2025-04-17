import { useEffect, useRef } from "react";
import { socket } from "@/lib/socket";

export const useWebRTC = (roomId: string) => {
  const peerConnections = useRef<Map<string, RTCPeerConnection>>(new Map());
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideosRef = useRef<Map<string, HTMLVideoElement>>(new Map());
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenSharingRef = useRef<MediaStreamTrack | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);

  const startRecording = () => {
    if (!localStreamRef.current) return;
    mediaRecorderRef.current = new MediaRecorder(localStreamRef.current);
    recordedChunks.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recording.webm";
      a.click();
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };
  const setupMedia = async () => {
    localStreamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (localVideoRef.current && localStreamRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
  };

  const createPeerConnection = (userId: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    if (localStreamRef.current) {
      localStreamRef.current
        .getTracks()
        .forEach((track) => pc.addTrack(track, localStreamRef.current!));
    }

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          to: userId,
          candidate: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      const stream = event.streams[0];
      let remoteVideo = remoteVideosRef.current.get(userId);
      if (!remoteVideo) {
        remoteVideo = document.createElement("video");
        remoteVideo.autoplay = true;
        remoteVideo.playsInline = true;
        remoteVideosRef.current.set(userId, remoteVideo);
        document.getElementById("remote-videos")?.appendChild(remoteVideo);
      }
      remoteVideo.srcObject = stream;
    };

    peerConnections.current.set(userId, pc);
    return pc;
  };
  const toggleAudio = () => {
    localStreamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

  const toggleVideo = () => {
    localStreamRef.current?.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

  const toggleScreenShare = async () => {
    if (!localStreamRef.current) return;

    if (screenSharingRef.current) {
      // Stop screen share and revert to webcam
      localStreamRef.current.getVideoTracks()[0].enabled = true;
      peerConnections.current.forEach((pc) => {
        const sender = pc.getSenders().find((s) => s.track?.kind === "video");
        if (sender && localStreamRef.current) {
          sender.replaceTrack(localStreamRef.current.getVideoTracks()[0]);
        }
      });
      screenSharingRef.current.stop();
      screenSharingRef.current = null;
    } else {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        const screenTrack = screenStream.getVideoTracks()[0];
        screenSharingRef.current = screenTrack;

        peerConnections.current.forEach((pc) => {
          const sender = pc.getSenders().find((s) => s.track?.kind === "video");
          if (sender) sender.replaceTrack(screenTrack);
        });

        screenTrack.onended = () => {
          toggleScreenShare(); // revert back when screen sharing ends
        };
      } catch (err) {
        console.error("Screen share failed", err);
      }
    }
  };
  useEffect(() => {
    setupMedia();
    socket.emit("join", { roomId });

    socket.on("user-joined", async (userId) => {
      const pc = createPeerConnection(userId);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("offer", { roomId, offer, to: userId });
    });

    socket.on("offer", async ({ offer, from }) => {
      const pc = createPeerConnection(from);
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", { to: from, answer });
    });

    socket.on("answer", async ({ answer, from }) => {
      const pc = peerConnections.current.get(from);
      if (pc) await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", ({ candidate, from }) => {
      const pc = peerConnections.current.get(from);
      if (pc) pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on("user-left", (userId) => {
      peerConnections.current.get(userId)?.close();
      peerConnections.current.delete(userId);
      const video = remoteVideosRef.current.get(userId);
      if (video) {
        video.remove();
        remoteVideosRef.current.delete(userId);
      }
    });

    return () => {
      peerConnections.current.forEach((pc) => pc.close());
    };
  }, [roomId]);

  return {
    localVideoRef,
    toggleAudio,
    toggleVideo,
    toggleScreenShare,
    startRecording,
    stopRecording,
  };
};
