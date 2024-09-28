export const ExportFileExtentionMap: Record<
  ExportFileFormat,
  ExportFileExtention
> = {
  CSV: ".csv",
  JSONL: ".jsonl",
};

type ExportingDatasetOptions = {
  datasetId: string;
  format: ExportFileFormat;
};

export default async function startExportingDataset({
  datasetId,
  format,
}: ExportingDatasetOptions) {
  const fileHandler = await window.showSaveFilePicker({
    suggestedName: "dataset-" + datasetId,
    types: [
      {
        description: "Text file",
        accept: { "text/plain": [ExportFileExtentionMap[format]] },
      },
    ],
  });

  const writableStream = await fileHandler.createWritable();

  const sessionToken = document.cookie.split("; ").reduce((acc, cookie) => {
    const cookieParts = cookie.split("=");
    if (cookieParts[0] === "__session") {
      acc = cookieParts[1];
    }
    return acc;
  }, "");

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_WS_BASE_URL;
  const url = `${baseUrl}/ws/export/${datasetId}?format=${format}&auth=${sessionToken}`;

  const socket = new WebSocket(url);

  return { socket, writableStream };
}
