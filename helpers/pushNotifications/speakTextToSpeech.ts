import { postTextToSpeech } from "@/config/api/textToSpeechApi";
import { File, Paths } from "expo-file-system";
import { createAudioPlayer } from "expo-audio";
import { $audioPlaying, setAudioPlaying } from "@/stores/audio/model";

let currentPlayer: ReturnType<typeof createAudioPlayer> | null = null;
let currentFile: File | null = null;

export async function speakTextToSpeech(text: string | null | undefined) {
  if (!text || !text.trim() || $audioPlaying.getState()) return;

  try {
    setAudioPlaying(true);
    const ssml = `<speak>${text}</speak>`;
    const audioData = await postTextToSpeech(ssml);

    const arrayBuffer = await audioData.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    const file = new File(Paths.cache, "tts.mp3");
    //@ts-ignore
    await file.write(bytes);
    currentFile = file;

    if (currentPlayer) {
      await currentPlayer.release?.();
      currentPlayer = null;
    }

    currentPlayer = createAudioPlayer({ uri: file.uri });
    currentPlayer.addListener("playbackStatusUpdate", status => {
      if ((status as any).didJustFinish) cleanup().catch(() => {});
    });

    await currentPlayer.play();
  } catch (err) {
    console.error("TTS playback failed", err);
    setAudioPlaying(false);
    await cleanup().catch(() => {});
  }
}

async function cleanup() {
  setAudioPlaying(false);
  if (currentPlayer) {
    await currentPlayer.release?.();
    currentPlayer = null;
  }
  if (currentFile) {
    try {
      await currentFile.delete();
    } catch {}
    currentFile = null;
  }
}
