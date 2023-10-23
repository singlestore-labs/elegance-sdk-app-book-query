import { eleganceClient } from "@/services/eleganceClient";
import { useState } from "react";

export type QueryInputProps = Omit<JSX.IntrinsicElements["form"], "onSubmit"> & {
  bookTableName: string;
  onSubmit?: (completion: string) => void;
};

export function QueryInput({ bookTableName, onSubmit, ...props }: QueryInputProps) {
  const [value, setValue] = useState("");

  const chatCompletion = eleganceClient.hooks.useChatCompletion();

  const handleSubmit: JSX.IntrinsicElements["form"]["onSubmit"] = async event => {
    event.preventDefault();
    if (!value || !bookTableName) return;

    try {
      const completion = await chatCompletion.execute({
        table: bookTableName,
        prompt: value.trim(),
        minSimilarity: 0.6,
        maxContextLength: 3000
      });

      if (completion) onSubmit?.(completion.content);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form {...props} className="w-full flex flex-col items-stretch" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What would you like to ask about the book?"
        onChange={event => setValue(event.target.value)}
        className="w-full border rounded-md px-6 py-4 text-lg outline-none hover:border-neutral-300  focus:border-black disabled:bg-neutral-100"
        autoFocus
        disabled={chatCompletion.isLoading}
      />

      <button
        className="bg-black text-white rounded-md px-8 py-4 hover:bg-neutral-800 active:bg-neutral-700 mt-4 disabled:bg-neutral-200"
        disabled={!value || chatCompletion.isLoading}
        type="submit"
      >
        Send
      </button>
    </form>
  );
}
