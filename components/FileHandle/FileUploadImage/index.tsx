import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import Image from "next/image";

export default function FileUploadImage({
  onChange,
  value,
  index,
}: {
  onChange: (value: string) => void;
  value: string;
  index: number;
}) {
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>("");

  const UploadFileToServer = useCallback(async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res_fetch = await fetch(
      process.env.MEDIA_UPLOAD_URL + "/api/v1/upload/image_safe_host",
      {
        method: "POST",
        body: formData,
      }
    );
    const res_data = await res_fetch.json();
    const imageUrl = `${process.env.MEDIA_UPLOAD_URL}${res_data.data}`;
    setPreview(imageUrl);
    onChange(imageUrl);
    setFile(undefined);
  }, [file, onChange]);

  useEffect(() => {
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setPreview(blobUrl); // Show local preview first
      UploadFileToServer();
      return () => URL.revokeObjectURL(blobUrl);
    }
  }, [file, UploadFileToServer]);

  useEffect(() => {
    setPreview(value || "");
  }, [value]);

  return (
    <div className="w-full h-fit space-y-2">
      {/* File Upload */}
      <input
        onChange={(e) => {
          const uploadedFile = e.target.files?.[0];
          if (uploadedFile) {
            setFile(uploadedFile);
          }
        }}
        type="file"
        id={`fileUpload_${index}`}
        className="hidden"
      />
      <label
        htmlFor={`fileUpload_${index}`}
        className="cursor-pointer inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Chọn ảnh từ máy
      </label>

      {/* Nhập link ảnh */}
      <input
        type="text"
        value={preview}
        onChange={(e) => {
          setPreview(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Hoặc nhập URL ảnh"
        className="border p-2 rounded-md w-full"
      />

      {/* Hiển thị ảnh */}
      {preview && (
        <div className="w-full rounded-md p-2">
          <Image
            src={preview}
            alt="preview"
            width={300}
            height={300}
            className="h-auto max-h-[300px] object-contain rounded"
          />
        </div>
      )}
    </div>
  );
}
