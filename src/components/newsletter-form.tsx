"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="font-mono text-xs tracking-[0.1em] border border-bg px-3 py-2">
        YOU&rsquo;RE IN.
      </p>
    );
  }

  return (
    <form
      className="flex border border-bg"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        required
        placeholder="EMAIL"
        aria-label="Email address"
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm font-mono placeholder:text-bg/50 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 px-4 font-mono text-xs tracking-[0.1em] border-l border-bg hover:bg-bg hover:text-fg transition-colors duration-150 cursor-pointer"
      >
        JOIN
      </button>
    </form>
  );
}
