"use client";

import { useState } from "react";
import { Uploader } from "./Uploader";

export function App({ ...props }: JSX.IntrinsicElements["div"]) {
  const [bookTableName, setBookTableName] = useState("");

  console.log(bookTableName);

  return (
    <div {...props} className="flex flex-1 flex-col items-center justify-center">
      <Uploader onUpload={bookTableName => setBookTableName(bookTableName)} />
    </div>
  );
}
