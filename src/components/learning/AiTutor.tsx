"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

type Message = {
  id: string;
  role: "USER" | "ASSISTANT";
  content: string;
};

export default function AiTutor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "USER",
      content: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content, sessionId }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.sessionId) setSessionId(data.sessionId);
        
        const aiMsg: Message = {
          id: data.message.id,
          role: "ASSISTANT",
          content: data.message.content,
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        console.error("Failed to get AI response");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          title="Open AI Tutor"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            padding: "16px",
            backgroundColor: "var(--color-brand-primary)",
            color: "#fff",
            borderRadius: "50%",
            border: "none",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            cursor: "pointer",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--color-brand-primary-hover)")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--color-brand-primary)")}
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "350px",
            height: "500px",
            maxHeight: "80vh",
            backgroundColor: "var(--color-bg-secondary)",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            border: "1px solid var(--color-border)",
            overflow: "hidden"
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "var(--color-brand-primary)",
              padding: "16px",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Bot size={20} />
              <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>AI Tutor</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.8)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: "4px"
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              backgroundColor: "var(--color-bg-primary)"
            }}
            className="sleek-scrollbar"
          >
            {messages.length === 0 ? (
              <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--color-text-secondary)", textAlign: "center", gap: "12px" }}>
                <Bot size={48} style={{ opacity: 0.5 }} />
                <p style={{ fontSize: "0.875rem", margin: 0 }}>Hi! I'm your AI Tutor. Ask me anything about your current lesson!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexDirection: msg.role === "USER" ? "row-reverse" : "row"
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      backgroundColor: msg.role === "USER" ? "var(--color-brand-primary)" : "var(--color-bg-tertiary)",
                      color: msg.role === "USER" ? "#fff" : "var(--color-text-primary)"
                    }}
                  >
                    {msg.role === "USER" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div
                    style={{
                      padding: "10px 16px",
                      borderRadius: "16px",
                      fontSize: "0.875rem",
                      backgroundColor: msg.role === "USER" ? "var(--color-brand-primary)" : "var(--color-bg-tertiary)",
                      color: msg.role === "USER" ? "#fff" : "var(--color-text-primary)",
                      borderTopRightRadius: msg.role === "USER" ? "0" : "16px",
                      borderTopLeftRadius: msg.role === "USER" ? "16px" : "0",
                      maxWidth: "80%",
                      lineHeight: 1.5
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backgroundColor: "var(--color-bg-tertiary)", color: "var(--color-text-primary)" }}>
                  <Bot size={16} />
                </div>
                <div style={{ padding: "12px 16px", borderRadius: "16px", borderTopLeftRadius: 0, backgroundColor: "var(--color-bg-tertiary)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "6px", height: "6px", backgroundColor: "var(--color-text-secondary)", borderRadius: "50%", animation: "pulseHeavy 1s infinite" }}></div>
                  <div style={{ width: "6px", height: "6px", backgroundColor: "var(--color-text-secondary)", borderRadius: "50%", animation: "pulseHeavy 1s infinite", animationDelay: "0.2s" }}></div>
                  <div style={{ width: "6px", height: "6px", backgroundColor: "var(--color-text-secondary)", borderRadius: "50%", animation: "pulseHeavy 1s infinite", animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: "16px",
              borderTop: "1px solid var(--color-border)",
              backgroundColor: "var(--color-bg-secondary)"
            }}
          >
            <form onSubmit={handleSubmit} style={{ position: "relative" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your tutor..."
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "12px 48px 12px 16px",
                  borderRadius: "24px",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-bg-primary)",
                  color: "var(--color-text-primary)",
                  fontSize: "0.875rem",
                  outline: "none"
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: (!input.trim() || isLoading) ? "var(--color-text-muted)" : "var(--color-brand-primary)",
                  cursor: (!input.trim() || isLoading) ? "not-allowed" : "pointer",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
