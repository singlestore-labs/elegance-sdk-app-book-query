import { eleganceClient } from "@/services/eleganceClient";
import { useRef } from "react";

export type BookUploaderProps = JSX.IntrinsicElements["div"] & {
  onUpload: (bookTableName: string) => void;
};

export function BookUploader({ onUpload, ...props }: BookUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const query = eleganceClient.hooks.useQuery();
  const createAndInsertBookEmbeddings = eleganceClient.hooks.useCreateAndInsertFileEmbeddings();

  const isLoading = query.isLoading || createAndInsertBookEmbeddings.isLoading;

  const uploadBook = (file: File | null) => {
    if (!file) return;

    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();

        reader.onload = async event => {
          if (event.target?.result) {
            const dataURL = event.target.result as string;
            const table = `books_chat_mysql.${file.name.split(".")[0].replace(/\W/g, "_")}`;

            await query.execute({
              query: `CREATE TABLE ${table} (
                    text TEXT,
                    embedding LONGBLOB NOT NULL
                  )`
            });

            await createAndInsertBookEmbeddings.execute({ table, dataURL });
            onUpload(table);
            resolve(true);
          }
        };

        reader.readAsDataURL(file);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleInputChange: JSX.IntrinsicElements["input"]["onChange"] = async event => {
    if (!event.target.files?.[0]) {
      event.target.value = "";
      return;
    }

    try {
      await uploadBook(event.target.files[0]);
    } catch (error) {
      console.error(error);
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div {...props}>
      <input ref={inputRef} type="file" accept=".pdf" hidden onChange={handleInputChange} disabled={isLoading} />

      <button
        className="bg-black text-white rounded-md px-8 py-4 hover:bg-gray-800 active:bg-gray-700"
        onClick={() => inputRef.current?.click()}
        disabled={isLoading}
      >
        {isLoading
          ? query.isLoading
            ? "Creating a table..."
            : createAndInsertBookEmbeddings.isLoading
            ? "Inserting book embeddings..."
            : "Uploading..."
          : "Upload a PDF"}
      </button>
    </div>
  );
}
