import * as React from "react";
import { useTranslation } from "react-i18next";

import FileUtils from "$app/utils/file";

import { showAlert } from "$app/components/server-components/Alert";

type UploadBoxProps = { onUploadFiles: (domFiles: File[]) => void };

const acceptedSubtitleExtensions = FileUtils.getAllowedSubtitleExtensions()
  .map((ext) => `.${ext}`)
  .join(",");

export const SubtitleUploadBox = ({ onUploadFiles }: UploadBoxProps) => {
  const { t } = useTranslation('common');
  const filePickerOnChange = (fileInput: HTMLInputElement) => {
    if (!fileInput.files) return;
    const files = [...fileInput.files];
    if (files.some((file) => !FileUtils.isFileNameASubtitle(file.name))) {
      showAlert(t("errors.invalid_file_type"), "error");
      return;
    }
    fileInput.value = "";
    onUploadFiles(files);
  };

  return (
    <label className="button primary">
      <input
        className="subtitles-file"
        type="file"
        name="file"
        accept={acceptedSubtitleExtensions}
        tabIndex={-1}
        multiple
        onChange={(e) => filePickerOnChange(e.target)}
      />
      Add subtitles
    </label>
  );
};
