import {extension} from "mime-types";

export function getFileNameBySlugAndSize(slugPrefix: string, size: { width: number, height: number, }, mimetype: string) {
    return `${slugPrefix}-${size.width}x${size.height}.${extension(mimetype)}`;
}