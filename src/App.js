import "./styles.css";
import logo from "./assets/logo.png";
import React from "react";

export default function App() {
  const [dow, setDow] = React.useState("none");
  const [stop, setStop] = React.useState(true);
  const [rec, setRec] = React.useState(false);

  const [videoElement, setVideoElement] = React.useState(null);
  const [downloadLink, setDownloadLink] = React.useState(null);
  const [stopButton, setStopButton] = React.useState(null);

  const [mr, setMr] = React.useState(null);

  React.useEffect(() => {
    const videoElement1 = document.getElementsByTagName("video")[0];
    setVideoElement(videoElement1);
    const downloadLink1 = document.getElementById("download");
    setDownloadLink(downloadLink1);
    const stopButton1 = document.getElementById("stop");
    setStopButton(stopButton1);
  }, []);

  function startRecord() {
    setRec(true);
    setStop(false);
    setDow("none");
  }

  function stopRecord() {
    setRec(false);
    setStop(true);
    setDow("inline");
  }

  const audioRecordConstraints = {
    echoCancellation: true,
  };

  const handleRecord = function ({ stream, mimeType }) {
    startRecord();
    let recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream);
    setMr(mediaRecorder);

    mediaRecorder.ondataavailable = function (e) {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };

    mediaRecorder.onstop = function () {
      const blob = new Blob(recordedChunks, {
        type: mimeType,
      });
      recordedChunks = [];
      const filename = window.prompt("Enter file name");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${filename || "recording"}.webm`;
      stopRecord();
      videoElement.srcObject = null;
    };

    mediaRecorder.start(200);
  };

  async function recordAudio() {
    const mimeType = "audio/webm";
    navigator.mediaDevices
      .getUserMedia({
        audio: audioRecordConstraints,
      })
      .then(function (stream) {
        handleRecord({ stream, mimeType });
      });
  }

  async function recordVideo() {
    const mimeType = "video/webm";
    const constraints = {
      audio: {
        echoCancellation: true,
      },
      video: {
        width: {
          min: 640,
          max: 1024,
        },
        height: {
          min: 480,
          max: 768,
        },
      },
    };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      videoElement.srcObject = stream;
      handleRecord({ stream, mimeType });
    });
  }

  async function recordScreen() {
    const mimeType = "video/webm";
    const constraints = {
      video: {
        cursor: "motion",
      },
    };
    if (!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)) {
      return window.alert("Screen Record not supported!");
    }
    let stream = null;
    navigator.mediaDevices
      .getDisplayMedia({
        video: { cursor: "motion" },
        audio: { echoCancellation: true },
      })
      .then((displayStream) => {
        const audioContext = new AudioContext();
        navigator.mediaDevices
          .getUserMedia({
            audio: { echoCancellation: true },
            video: false,
          })
          .then((voiceStream) => {
            const audioIn01 =
              audioContext.createMediaStreamSource(displayStream);
            const audioIn02 = audioContext.createMediaStreamSource(voiceStream);
            const audioDestination =
              audioContext.createMediaStreamDestination();

            audioIn01.connect(audioDestination);
            audioIn02.connect(audioDestination);

            const tracks = [
              ...displayStream.getVideoTracks(),
              ...audioDestination.stream.getTracks(),
            ];
            stream = new MediaStream(tracks);

            handleRecord({ stream, mimeType });
            videoElement.srcObject = stream;
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <div className="App__Header">
        <img src={logo} width="150px" height="150px" />
        <h1>Scorder</h1>
      </div>

      <div className="App__Description">
        <h3>
          A simple media recorder for people who haven't got the time to deal
          with Complex Software
        </h3>
      </div>

      <div className="App__Body">
        <button style={{ display: `${dow}` }} id="Download" className="record">
          <a id="download">Download</a>
        </button>
        <button
          id="stop"
          className="record"
          disabled={stop}
          onClick={() => {
            mr.stop();
          }}
        >
          Stop
        </button>
        <button className="record" disabled={rec} onClick={recordAudio}>
          Record Audio
        </button>
        <button className="record" disabled={rec} onClick={recordVideo}>
          Record Video
        </button>
        <button className="record" disabled={rec} onClick={recordScreen}>
          Record Screen
        </button>
      </div>

      <div className="App__Vid">
        <video autoPlay height="480" width="640" muted></video>
      </div>
    </div>
  );
}
