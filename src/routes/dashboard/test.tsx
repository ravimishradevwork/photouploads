import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Upload, Loader, Sparkles, Download, Check, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/test")({
  head: () => ({
    meta: [{ title: "AI Photo Lab | PRMorph" }],
  }),
  component: AILabPage,
});

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function AILabPage() {
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [transformedPhoto, setTransformedPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");

  // SSR-friendly storage for HuggingFace API key
  const [apiKey, setApiKey] = useState(""); // Don't read localStorage on first render!
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // SSR FIX: Only use localStorage after mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("hf_api_key") || "";
      setApiKey(stored);
      setShowApiKeyInput(!stored);
    }
  }, []);

  const templates = [
    {
      id: "luxury-poster",
      name: "Luxury Poster",
      preview: "https://images.unsplash.com/photo-1557821552-17105176677c?w=300&h=400&fit=crop",
      prompt: "luxury poster style, high contrast, golden tones, professional, elegant",
      description: "High contrast with warm golden tones",
    },
    {
      id: "festival-promo",
      name: "Festival Promo",
      preview: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=400&fit=crop",
      prompt: "festival promo style, vibrant colors, saturated, energetic, dynamic",
      description: "Vibrant saturated colors",
    },
    {
      id: "influencer-look",
      name: "Influencer Look",
      preview: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=400&fit=crop",
      prompt: "influencer style, cool tones, bright, beautiful lighting, flattering",
      description: "Cool tones with brightness",
    },
    {
      id: "business-ad",
      name: "Business Ad",
      preview: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=400&fit=crop",
      prompt: "professional business style, corporate, serious, grayscale, sophisticated",
      description: "Professional grayscale",
    },
    {
      id: "fitness-cover",
      name: "Fitness Cover",
      preview: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=400&fit=crop",
      prompt: "fitness cover style, bold, energetic, high contrast, red and orange tones",
      description: "High contrast bold reds",
    },
    {
      id: "professional-headshot",
      name: "Professional Headshot",
      preview: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      prompt: "professional headshot style, smooth skin, flattering lighting, neutral background",
      description: "Smooth skin tones",
    },
  ];

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string);
        setTransformedPhoto(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveApiKey = (key: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("hf_api_key", key);
    }
    setApiKey(key);
    setShowApiKeyInput(false);
  };

  const addChatMessage = (content: string, role: "user" | "assistant" = "user") => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, newMessage]);
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput("");
    addChatMessage(userMessage, "user");
    addChatMessage("Instruction received! Will apply when you generate.", "assistant");
  };

  const buildTransformationPrompt = (): string => {
    const selectedTemplateObj = templates.find((t) => t.id === selectedTemplate);
    let prompt = "";

    if (selectedTemplateObj) {
      prompt += selectedTemplateObj.prompt;
    }

    if (chatMessages.length > 0) {
      const userInstructions = chatMessages
        .filter((m) => m.role === "user")
        .map((m) => m.content)
        .join(", ");
      if (userInstructions) {
        prompt += `, ${userInstructions}`;
      }
    }

    return prompt || "enhance and improve the image";
  };

 const transformImageWithHuggingFace = async (imageSrc: string, prompt: string) => {
  try {
    setLoading(true);
    setError(null);

    // POST to your Express proxy, not Hugging Face directly!
    const response = await fetch("http://localhost:4000/api/hf-proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64Image: imageSrc, prompt }),
    });

    if (!response.ok) {
      let remoteErr = "";
      try {
        const errData = await response.json();
        remoteErr = errData.error || response.statusText;
      } catch (e) {
        remoteErr = response.statusText;
      }
      setError(`Proxy Error (${response.status}): ${remoteErr}`);
      setLoading(false);
      addChatMessage(`❌ Proxy Error (${response.status}): ${remoteErr}`, "assistant");
      return;
    }

    const data = await response.json();
    // assuming: { image: "data:image/png;base64,....."}
    setTransformedPhoto(data.image);
    addChatMessage(`✅ Image transformed with prompt: "${prompt}"`, "assistant");
    setLoading(false);
  } catch (err: any) {
    console.error("Proxy/network error:", err);
    setError(`Network/client error: ${err.message || String(err)}`);
    setLoading(false);
    addChatMessage(`❌ Client Error: ${err.message || String(err)}`, "assistant");
  }
};
  const handleGenerateAI = async () => {
    if (!uploadedPhoto) {
      setError("Please upload a photo first");
      return;
    }
    if (!selectedTemplate && chatMessages.filter((m) => m.role === "user").length === 0) {
      setError("Please select a template or write instructions");
      return;
    }
    if (!apiKey) {
      setError("Please add your Hugging Face API key first");
      setShowApiKeyInput(true);
      return;
    }

    const prompt = buildTransformationPrompt();
    await transformImageWithHuggingFace(uploadedPhoto, prompt);
  };

  const downloadImage = () => {
    if (!transformedPhoto) return;
    const link = document.createElement("a");
    link.href = transformedPhoto;
    link.download = `prmorph-${selectedTemplate}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedTemplateObj = templates.find((t) => t.id === selectedTemplate);

  if (showApiKeyInput) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Welcome to AI Photo Lab</h1>
            <p className="text-muted-foreground">
              Add your Hugging Face API key to get started
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
              <p className="font-semibold mb-2">📌 Get Your Free API Key:</p>
              <ol className="space-y-1 list-decimal list-inside">
                <li>Go to: <a href="https://huggingface.co/settings/tokens" target="_blank" className="font-semibold underline">huggingface.co/settings/tokens</a></li>
                <li>Sign up (free) if needed</li>
                <li>Create an "Access Token"</li>
                <li>Copy and paste below</li>
              </ol>
            </div>

            <input
              type="password"
              placeholder="hf_xxxxxxxxxxxxxxxxxxxx"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <Button
              onClick={() => {
                if (apiKey.trim()) {
                  saveApiKey(apiKey.trim());
                } else {
                  setError("Please enter your API key");
                }
              }}
              className="w-full"
            >
              Save & Continue
            </Button>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">AI Photo Lab</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Transform photos with Hugging Face AI + Your Instructions
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.localStorage.removeItem("hf_api_key");
              }
              setShowApiKeyInput(true);
            }}
          >
            Change API Key
          </Button>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Upload Section - Left */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border-2 border-dashed border-primary/50 p-8 text-center hover:border-primary transition cursor-pointer">
              <input
                type="file"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
                accept="image/*"
              />
              <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center">
                <Upload size={48} className="mb-4 text-primary" />
                <p className="text-lg font-semibold mb-2">Upload your photo</p>
                <p className="text-muted-foreground text-sm">Drag and drop or click</p>
              </label>
            </div>
            {uploadedPhoto && (
              <div className="rounded-2xl overflow-hidden border border-border">
                <img src={uploadedPhoto} alt="Uploaded" className="w-full h-auto object-cover" />
              </div>
            )}
          </div>

          {/* Template + Chat - Right */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Selection */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Select Template Style</h2>
              <div className="grid grid-cols-3 gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`group relative overflow-hidden rounded-lg transition-all ${
                      selectedTemplate === template.id
                        ? "ring-2 ring-primary shadow-lg scale-105"
                        : "hover:shadow-md"
                    }`}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img
                        src={template.preview}
                        alt={template.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                      <div className="absolute inset-0 flex flex-col justify-end p-2 text-white">
                        <p className="font-semibold text-xs">{template.name}</p>
                      </div>
                      {selectedTemplate === template.id && (
                        <div className="absolute top-1 right-1 bg-primary rounded-full p-1">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Interface */}
            <div className="border border-border rounded-2xl overflow-hidden flex flex-col h-96 bg-secondary/20">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.length === 0 && (
                  <div className="h-full flex items-center justify-center text-center">
                    <div>
                      <MessageCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground text-sm">
                        Describe what you want in the chat below
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        E.g., "Make me look confident and professional"
                      </p>
                    </div>
                  </div>
                )}

                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border border-border"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="border-t border-border p-3 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
                  placeholder="Describe your transformation..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button size="sm" onClick={handleChatSubmit} disabled={!chatInput.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <Button onClick={handleGenerateAI} disabled={loading} size="lg" className="w-full">
              {loading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin mr-2" /> Transforming with AI...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" /> Generate with Hugging Face AI
                </>
              )}
            </Button>

            {/* Selected Template Info */}
            {selectedTemplateObj && (
              <div className="p-3 bg-secondary/50 rounded-lg text-sm">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{selectedTemplateObj.name}</span>{" "}
                  selected
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Before & After Section */}
        {(uploadedPhoto || transformedPhoto) && (
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold">Before & After</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Before */}
              <div className="rounded-2xl border border-border overflow-hidden">
                <div className="bg-secondary p-4">
                  <h3 className="font-semibold mb-3">Original</h3>
                  {uploadedPhoto && (
                    <img src={uploadedPhoto} alt="Before" className="w-full h-96 object-cover rounded-lg" />
                  )}
                </div>
              </div>

              {/* After */}
              <div className="rounded-2xl border border-border overflow-hidden">
                <div className="bg-secondary p-4 space-y-3">
                  <h3 className="font-semibold">
                    After {selectedTemplateObj && `(${selectedTemplateObj.name})`}
                  </h3>
                  {transformedPhoto ? (
                    <>
                      <img src={transformedPhoto} alt="After" className="w-full h-96 object-cover rounded-lg" />
                      <Button onClick={downloadImage} variant="default" className="w-full gap-2">
                        <Download className="h-4 w-4" />
                        Download Image
                      </Button>
                    </>
                  ) : (
                    <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Transformation will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AILabPage;