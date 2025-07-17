

export default function PDFViewer({ url, name }: { url: string, name: string }) {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <iframe
                src={url}
                className="w-full h-full"
                title={name}
            ></iframe>
        </div>
    );
}