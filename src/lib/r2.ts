import { env } from "cloudflare:workers";

export async function uploadProjectFiles(
  projectId: string,
  files: File[]
): Promise<string[]> {
  const uploadedFiles: string[] = [];

  for (const file of files) {
    if (!(file instanceof File) || file.size === 0) continue;

    const fileName = `${Date.now()}-${file.name}`;
    const key = `${projectId}/${fileName}`;

    await env.PROJECT_FILES.put(key, await file.arrayBuffer(), {
      httpMetadata: {
        contentType: file.type,
      },
    });

    uploadedFiles.push(file.name);
  }

  return uploadedFiles;
}