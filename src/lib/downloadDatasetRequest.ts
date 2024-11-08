import extractCookie from "@/utils/extractCookie";

export default async function downloadDatasetRequest(
    path: string, fileName?: string
) {
    const Authorization = extractCookie("__session");
    const headers: HeadersInit = new Headers();
    if (Authorization) {
        headers.set("Authorization", "Bearer " + Authorization);
    }

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    const response = await fetch(`${baseUrl}/${path}`, { headers });

    const url = window.URL.createObjectURL(
        new Blob([await response.blob()],
            { type: "text/plain" })
    );

    const link = document.createElement('a');
    link.href = url;
    fileName && link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}
