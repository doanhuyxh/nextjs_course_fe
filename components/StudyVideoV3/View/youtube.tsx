export default function VideoYoutube({ url }: { url: string }) {
  // Hàm tách videoId từ link YouTube
  const getYouTubeId = (youtubeUrl: string) => {
    const regExp =
      /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = youtubeUrl.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  const videoId = getYouTubeId(url);
  if (!videoId) {
    return <div>URL không hợp lệ</div>;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        className="w-full h-full"
        title={`YouTube video ${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
