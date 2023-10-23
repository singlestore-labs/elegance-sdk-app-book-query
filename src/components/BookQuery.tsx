"use client";

import { useState } from "react";
import { BookUploader } from "./BookUploader";
import { QueryInput } from "./QueryInput";

export function BookQuery({ ...props }: JSX.IntrinsicElements["div"]) {
  const [bookTableName, setBookTableName] = useState("123");
  const [completion, setCompletion] = useState("");

  let render;

  if (!bookTableName) {
    render = <BookUploader onUpload={bookTableName => setBookTableName(bookTableName)} />;
  } else {
    if (completion) {
      render = (
        <div className="w-full flex flex-col items-stretch">
          <p className="border rounded-md bg-neutral-100 p-4">{completion}</p>

          <button
            className="bg-black text-white rounded-md px-8 py-4 hover:bg-neutral-800 active:bg-neutral-700 mt-4 disabled:bg-neutral-200"
            onClick={() => setCompletion("")}
          >
            Ask another question
          </button>
        </div>
      );
    } else {
      render = <QueryInput bookTableName={bookTableName} onSubmit={setCompletion} />;
    }
  }

  return (
    <div {...props} className="flex flex-1 flex-col items-center justify-center w-full mx-auto">
      {render}
    </div>
  );
}
