export class Books {
    BookID: number;
    title: string;
    author: string;
    cover: string;
    KindleFile: string;
    PDFFile: string;
    EPUBFile: string;
    createdAt?: string;
    updatedAt?: string;
    KindleFileExists?: boolean;
    PDFFileExists?: boolean;
    EPUBFileExists?: boolean;
}

export class BookFile {
    BookID: number;
    file?: string;
}