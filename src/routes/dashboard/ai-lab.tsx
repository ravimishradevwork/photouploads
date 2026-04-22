import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Upload, Download } from "lucide-react";
import Cropper from "react-easy-crop";
import * as bodyPix from "@tensorflow-models/body-pix";
import "@tensorflow/tfjs-backend-webgl";

export const Route = createFileRoute("/dashboard/ai-lab")({
  head: () => ({
    meta: [{ title: "AI Photo Lab | PRMorph" }],
  }),
  component: AILabPage,
});

const TEMPLATES = [
  { name: "Vivid", color: "from-yellow-400 to-orange-600", desc: "Punchy, high vibrance" },
  { name: "Warm", color: "from-orange-400 to-yellow-200", desc: "Golden cozy tones" },
  { name: "Cool", color: "from-blue-400 to-cyan-300", desc: "Cool blue mood" },
  { name: "Matte", color: "from-gray-200 to-gray-600", desc: "Soft, faded, matte" },
  { name: "Black & White", color: "from-gray-800 to-gray-200", desc: "Classic B&W" },
  { name: "Retro", color: "from-yellow-500 to-pink-400", desc: "Muted vintage" },
  { name: "Film", color: "from-teal-500 to-yellow-200", desc: "Teal/yellow" },
  { name: "Moody", color: "from-gray-700 to-blue-900", desc: "Dark cinematic" },
];

// Utility to make an image from url/base64
function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = "anonymous";
    img.src = url;
  });
}

// Cropper utility (600x600, white BG)
async function getCroppedPassportImage(imageSrc, cropPixels) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const outSize = 600;
  canvas.width = canvas.height = outSize;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, outSize, outSize);

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  ctx.drawImage(
    image,
    cropPixels.x * scaleX,
    cropPixels.y * scaleY,
    cropPixels.width * scaleX,
    cropPixels.height * scaleY,
    0, 0, outSize, outSize
  );
  return canvas.toDataURL("image/jpeg", 0.98);
}

// Blur background, leave subject clear
async function blurImageBackground(src, cb, onErr) {
  try {
    const net = await bodyPix.load();
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      const segmentation = await net.segmentPerson(img);
      ctx.filter = "blur(18px)";
      ctx.drawImage(img, 0, 0);
      ctx.filter = "none";
      const fgCanvas = document.createElement("canvas");
      fgCanvas.width = img.width;
      fgCanvas.height = img.height;
      const fgCtx = fgCanvas.getContext("2d");
      fgCtx.drawImage(img, 0, 0);
      const imgData = fgCtx.getImageData(0, 0, img.width, img.height);
      const { data } = segmentation;
      for (let i = 0; i < data.length; i++) {
        if (data[i] === 0) imgData.data[i * 4 + 3] = 0;
      }
      fgCtx.putImageData(imgData, 0, 0);
      ctx.drawImage(fgCanvas, 0, 0);
      cb(canvas.toDataURL("image/png"));
    };
    img.onerror = () => onErr("Image load error for blur.");
    img.src = src;
  } catch {
    onErr("Blur processing error.");
  }
}

// Style filter
function applyTemplateFilter(imageSrc, templateName, setOut, setErr) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) { setErr("Canvas error"); return; }
  const img = new window.Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    switch (templateName) {
      case "Vivid":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.13);
          data[i + 1] = Math.min(255, data[i + 1] * 1.1);
          data[i + 2] = Math.min(255, data[i + 2] * 1.14);
        } break;
      case "Warm":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.14);
          data[i + 2] = Math.min(255, data[i + 2] * 0.91);
        } break;
      case "Cool":
        for (let i = 0; i < data.length; i += 4) {
          data[i + 2] = Math.min(255, data[i + 2] * 1.24);
        } break;
      case "Matte":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = (data[i] + 200) / 2;
          data[i + 1] = (data[i + 1] + 200) / 2;
          data[i + 2] = (data[i + 2] + 200) / 2;
        } break;
      case "Black & White":
        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          data[i] = data[i + 1] = data[i + 2] = gray;
        } break;
      case "Retro":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = data[i] * 0.97 + 17;
          data[i + 1] = data[i + 1] * 0.95 + 14;
          data[i + 2] = data[i + 2] * 0.97 + 17;
        } break;
      case "Film":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = (data[i] + 20) / 1.1;
          data[i + 2] = (data[i + 2] + 16) / 1.07;
        } break;
      case "Moody":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.max(0, data[i] * 0.88 - 8);
          data[i + 1] = Math.max(0, data[i + 1] * 0.83 - 7);
          data[i + 2] = Math.max(0, data[i + 2] * 0.92);
        } break;
      default: break;
    }
    ctx.putImageData(imageData, 0, 0);
    setOut(canvas.toDataURL());
  };
  img.onerror = () => setErr("Image load error");
  img.src = imageSrc;
}

function AILabPage() {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState(null);
  const [chatboxPrompt, setChatboxPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const [passport, setPassport] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [blur, setBlur] = useState(false);
  const [baseResult, setBaseResult] = useState(null);
  const [after, setAfter] = useState(null);

  useEffect(() => {
    if (!uploadedPhoto || !selected) {
      setBaseResult(null);
      setAfter(null);
      return;
    }
    setAiLoading(true);
    applyTemplateFilter(
      uploadedPhoto,
      selected,
      styled => {
        setBaseResult(styled);
        setAfter(styled);
        setAiLoading(false);
        setBlur(false);
      },
      err => { setError(err); setAiLoading(false); }
    );
  }, [uploadedPhoto, selected]);

  useEffect(() => {
    if (passport && uploadedPhoto) {
      setShowCropper(true);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    } else {
      setShowCropper(false);
    }
  }, [passport, uploadedPhoto]);

  useEffect(() => {
    if (!baseResult) {
      setAfter(null);
      return;
    }
    if (blur) {
      setAiLoading(true);
      blurImageBackground(baseResult, (blurred) => {
        setAfter(blurred);
        setAiLoading(false);
      }, (err) => {
        setError(err);
        setAiLoading(false);
      });
    } else {
      setAfter(baseResult);
    }
  }, [blur, baseResult]);

  function handlePhotoUpload(e) {
    setError(null);
    setPassport(false); setBlur(false); setShowCropper(false);
    setBaseResult(null); setAfter(null);
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setUploadedPhoto(reader.result);
    reader.readAsDataURL(file);
  }

  async function handleApplyCrop() {
    if (uploadedPhoto && croppedAreaPixels) {
      setAiLoading(true);
      const result = await getCroppedPassportImage(uploadedPhoto, croppedAreaPixels);
      setBaseResult(result);
      setAfter(result);
      setAiLoading(false);
      setShowCropper(false);
      setBlur(false);
    }
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">AI Photo Lab</h1>
        <div className="flex flex-col md:flex-row md:items-start gap-10 mb-6">
          <div className="md:w-1/3 flex flex-col gap-4">
            <input type="file" onChange={handlePhotoUpload} id="photo-upload" className="hidden" accept="image/*" />
            <label
              htmlFor="photo-upload"
              className="rounded-xl border-2 border-dashed border-primary/40 flex flex-col items-center justify-center p-7 text-center cursor-pointer hover:border-primary transition"
              style={{ minHeight: 100 }}
            >
              <Upload size={32} className="mb-2 text-primary" />
              <div>Upload photo</div>
              <div className="text-muted-foreground text-xs">Drag or click to select</div>
            </label>
            <div>
              <div className="font-semibold mb-1">Style Preset</div>
              <div className="flex flex-wrap gap-2 mb-1">
                {TEMPLATES.map((tmpl) => (
                  <button
                    type="button"
                    key={tmpl.name}
                    onClick={() => setSelected(tmpl.name)}
                    className={`px-3 py-2 rounded-lg bg-gradient-to-br ${tmpl.color} text-xs transition-all ${
                      selected === tmpl.name ? "ring-2 ring-primary scale-105 text-white" : "opacity-90 hover:opacity-100 text-gray-800"
                    }`}
                    title={tmpl.desc}
                  >
                    {tmpl.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={blur}
                onChange={e => setBlur(e.target.checked)}
                className="scale-110"
                id="chk-blur"
                disabled={!baseResult}
              />
              <label htmlFor="chk-blur" className="text-sm select-none cursor-pointer">Blur background</label>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={passport}
                onChange={e => setPassport(e.target.checked)}
                className="scale-110"
                id="chk-passport"
                disabled={!uploadedPhoto}
              />
              <label htmlFor="chk-passport" className="text-sm select-none cursor-pointer">
                Passport size (India)
              </label>
            </div>
            {error && <div className="mt-2 p-2 bg-destructive/10 text-destructive text-sm rounded">{error}</div>}
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center rounded-xl border bg-secondary p-3 min-h-[14rem] h-56 max-h-56 transition-all">
              <span className="font-semibold mb-1">Before</span>
              {uploadedPhoto ? (
                <div className="rounded-xl w-full h-44 flex items-center justify-center overflow-hidden bg-white">
                  <img
                    src={uploadedPhoto}
                    alt="Before"
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <div className="text-muted-foreground text-sm mt-5">Upload a photo</div>
              )}
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border bg-secondary p-3 min-h-[14rem] h-56 max-h-56 transition-all">
              <span className="font-semibold mb-1">After</span>
              {aiLoading ? (
                <span className="mt-8 text-muted-foreground">Processing...</span>
              ) : after ? (
                <>
                  <div className="rounded-xl w-full h-44 flex items-center justify-center overflow-hidden bg-white">
                    <img
                      src={after}
                      alt="After"
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <a
                    href={after}
                    download="photo-modified.jpg"
                    className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-yellow-500 text-white rounded shadow text-base font-medium"
                  >
                    <Download size={18} /> Download
                  </a>
                </>
              ) : (
                <div className="text-muted-foreground text-sm mt-5">
                  {(!uploadedPhoto || !selected)
                    ? "Select a style to preview..."
                    : "Will appear here"}
                </div>
              )}
            </div>
          </div>
        </div>

        {passport && showCropper && uploadedPhoto && (
          <div
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              zIndex: 9999,
              background: "rgba(0,0,0,0.5)",
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ background: '#fff', padding: 20, borderRadius: 16 }}>
              <div style={{ position: "relative", width: 350, height: 350 }}>
                <Cropper
                  image={uploadedPhoto}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  showGrid={true}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, cap) => setCroppedAreaPixels(cap)}
                  cropShape="rect"
                  minZoom={1}
                  maxZoom={5}
                  restrictPosition={false}
                  zoomWithScroll={true}
                  // keys: pointer events and keyboard control are default true
                />
                {/* Zoom slider under cropper */}
                <div style={{ marginTop: 16 }}>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={0.01}
                    value={zoom}
                    onChange={e => setZoom(Number(e.target.value))}
                    style={{ width: 250 }}
                  />
                  <div style={{ fontSize: 12 }}>Zoom</div>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  className="px-6 py-2 rounded bg-primary text-white"
                  onClick={handleApplyCrop}
                >
                  Apply Crop
                </button>
                <button
                  className="px-6 py-2 rounded bg-gray-200"
                  onClick={() => setShowCropper(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-full max-w-xl mx-auto mt-8 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Type your prompt/message for AI to generate Image"
            className="border rounded px-3 py-2 text-base"
            value={chatboxPrompt}
            onChange={e => setChatboxPrompt(e.target.value)}
            disabled={!uploadedPhoto || !selected}
          />
          <button
            className="w-full py-2 bg-primary text-white font-bold rounded hover:opacity-90 transition mt-1"
            disabled={!uploadedPhoto || !selected || aiLoading || !chatboxPrompt}
            onClick={() => {}}
          >
            {aiLoading ? "Processing..." : "Generate"}
          </button>

        </div>

      </div>
      <div align="center" className="mt-10">
       
          <footer
        style={{
          width: "60%",
          textAlign: "center",
          color: "#aaa",
          fontSize: 7,
          padding: "1px 0",
          background: "#18181b",
          letterSpacing: ".01em"
        }}
      >
        &copy; {new Date().getFullYear()}  PRMorph Ltd. | Innovating identity, simplifying access


      </footer>

      </div>
    </div>
  );
}

export default AILabPage;