
export default function VideoMp4({ url, poster = "/default-thumbnail.jpg" }: { url: string, poster?: string }) {
    return (
        <video
            className="w-full h-full"
            controls
            src={url}
            poster={poster}
        />
    );
}