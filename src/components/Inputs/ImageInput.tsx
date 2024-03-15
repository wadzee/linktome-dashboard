"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { List } from "../List/List";
import { Text } from "../Text/Text";
import classNames from "classnames";
import { PlusIcon, TrashIcon } from "../Icons";

export interface ImageInputProps {
  label?: string;
  src?: string;
  className?: string;
  customFilename?: string;
  onImageUploaded?: (file: File) => void;
  imageSize?: {
    width: number;
    height: number;
  };
  allowEdit?: boolean;
}

const noop = () => {};

export function ImageInput({
  label,
  src,
  className,
  onImageUploaded = noop,
  imageSize = {
    width: 160,
    height: 160,
  },
  customFilename,
  allowEdit = false,
}: ImageInputProps) {
  const [image, setImage] = useState<string>();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      let file: File = acceptedFiles[0];
      if (customFilename) {
        file = new File(
          [file],
          `${customFilename}.${file.type.split("/").pop()}`,
          {
            type: file.type,
          }
        );
      }
      setImage(URL.createObjectURL(file));
      onImageUploaded(file);
    },
  });

  useEffect(() => {
    if (src) {
      setImage(src);
    }
  }, [src, allowEdit]);

  const renderImage = useCallback(
    (src: string) => {
      return (
        <div className="relative w-fit">
          {allowEdit && (
            <button
              className="absolute h-fit trash-icon"
              type="button"
              onClick={() => setImage("")}
            >
              <TrashIcon width={18} height={18} />
            </button>
          )}
          <Image
            src={src}
            onLoad={() => URL.revokeObjectURL(src)}
            alt="image-preview"
            width={imageSize.width}
            height={imageSize.height}
            className={classNames(
              "aspect-square object-cover rounded-2xl",
              className
            )}
          />
        </div>
      );
    },
    [allowEdit, className, imageSize.height, imageSize.width]
  );

  return (
    <List gap="gap-4">
      {label && <Text>{label}</Text>}
      {!image && (
        <div {...getRootProps({ className: "dropzone" })} className="w-fit">
          <input {...getInputProps()} multiple={false} />
          <div className={classNames("image-dropzone", className)}>
            <PlusIcon width={24} height={24} className="fill-secondary-dark" />
          </div>
        </div>
      )}
      {image && <aside>{renderImage(image)}</aside>}
    </List>
  );
}
