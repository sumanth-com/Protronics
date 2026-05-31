"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageUploaderProps = {
  files: File[];
  onChange: (files: File[]) => void;
  max?: number;
  required?: boolean;
  error?: string;
};

export default function ImageUploader({
  files,
  onChange,
  max = 5,
  required,
  error,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const previews = files.map((file) => ({
    file,
    url: URL.createObjectURL(file),
  }));

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const next = [...files, ...Array.from(incoming)].slice(0, max);
      onChange(next);
    },
    [files, max, onChange],
  );

  const removeAt = (idx: number) => {
    onChange(files.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <span className="mb-2 block text-[12px] font-medium text-theme-fg-muted">
        Upload Images {required ? "*" : ""} (up to {max})
      </span>

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex min-h-[128px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-6",
          "border-theme-border bg-theme-input-bg transition-colors",
          dragOver && "border-theme-accent bg-theme-accent/5",
          error && "border-red-400/50",
        )}
      >
        <ImagePlus className="h-8 w-8 text-theme-fg-muted" />
        <span className="mt-2 text-[13px] font-medium text-theme-fg-secondary">
          Drag & drop or tap to upload
        </span>
        <span className="mt-1 text-[11px] text-theme-fg-faint">
          Camera or gallery · JPG, PNG
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {error ? <p className="mt-1.5 text-[12px] text-red-500">{error}</p> : null}

      {previews.length > 0 ? (
        <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {previews.map(({ file, url }, idx) => (
            <li
              key={`${file.name}-${idx}`}
              className="relative aspect-square overflow-hidden rounded-lg border border-theme-border bg-theme-bg-secondary"
            >
              <Image src={url} alt={file.name} fill className="object-cover" sizes="80px" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeAt(idx);
                }}
                className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-theme-bg/90 text-theme-fg shadow-sm"
                aria-label={`Remove ${file.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
