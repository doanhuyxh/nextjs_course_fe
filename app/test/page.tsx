export default function TestPage() {
    return (
        <div>
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                    src="https://iframe.mediadelivery.net/embed/344217/34b5b0ab-a88c-4416-a886-ad306c22b4ee?autoplay=true&loop=true&muted=true&preload=true&responsive=true"
                    loading="lazy"
                    style={{
                        border: 0,
                        position: 'absolute',
                        top: 0,
                        height: '100%',
                        width: '100%',
                    }}
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
