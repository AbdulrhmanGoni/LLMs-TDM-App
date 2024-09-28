import startExportingDataset from "@/lib/startExportingDataset";

export class DatasetExportingState {
  dataset: Dataset;
  exportingProgress: number;
  isExporting: boolean;
  isDone: boolean;
  isCanceled: boolean;
  errorMessage: string;
  private exportingSocket?: WebSocket;
  private writableStream?: FileSystemWritableFileStream;
  options: ExportDatasetOptions;
  updator: () => void;

  constructor(
    dataset: Dataset,
    options: ExportDatasetOptions,
    updator: () => void
  ) {
    this.dataset = dataset;
    this.options = options;
    this.exportingProgress = 0;
    this.isExporting = false;
    this.isDone = false;
    this.isCanceled = false;
    this.errorMessage = "";
    this.updator = updator;
  }

  async startExporting() {
    const { socket, writableStream } = await startExportingDataset({
      datasetId: this.dataset._id,
      format: this.options.format,
    });

    this.isExporting = true;
    this.writableStream = writableStream;
    this.exportingSocket = socket;

    socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data?.chunk) {
        await writableStream.write(data.chunk);

        if (data?.progress) {
          this.exportingProgress = data.progress;
          if (data?.done) {
            await this.exportingDone();
          } else {
            this.updator();
          }
        }
      }
    };

    socket.onclose = async (event) => {
      if (event.reason) {
        this.errorMessage = event.reason;
        this.updator();
      }
    };
  }

  private async exportingDone() {
    this.isDone = true;
    this.isExporting = false;
    this.isCanceled = false;
    this.exportingProgress = 100;
    this.updator();
    await this.writableStream?.close();
    this.exportingSocket?.close();
    this.writableStream = undefined;
    this.exportingSocket = undefined;
  }

  resetState(canceled: boolean = false) {
    this.isCanceled = canceled;
    this.isDone = false;
    this.isExporting = false;
    this.errorMessage = "";
    this.exportingProgress = 0;
    this.updator();
  }

  async cancelExporting() {
    this.resetState(true);
    await this.writableStream?.abort();
    this.exportingSocket?.close();
  }
}
