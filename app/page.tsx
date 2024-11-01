"use client";

import { useChat } from "ai/react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="p-4">
      {messages.map((m) => (
        <div className="p-4" key={m.id}>
          {m.role === "user" ? "tfw " + m.content : m.content}
        </div>
      ))}

      <form className="m-2 p-4 border" onSubmit={handleSubmit}>
        <input
          className="w-full focus:outline-none focus:ring-0"
          value={input}
          placeholder="That feeling when..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
