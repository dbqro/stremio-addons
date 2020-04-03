import Video from "./models/video";
import { MetaPreview, MetaDetail, Stream } from "stremio-addon-sdk";
import { b64encode } from "./helpers";
import VideoSource from "./models/vide_source";
import Assets from "./assets";

export function toMetaPreview(video: Video) {
    return <MetaPreview>{
        id: `xnxx:${b64encode(video.endpoint)}`,
        name: video.title,
        type: 'movie',
        background: Assets.BACKGROUND_PLAIN_BLUE,
        description: `⌚ ${video.duration}\n🤪 ${video.quality}\n👀 ${video.views}`,
        logo: Assets.LOGO_ROUND,
        poster: video.thumbnail,
        posterShape: 'landscape',
    };
}

export function toMetaDetails(video: Video) {
    const metaPreview = toMetaPreview(video);
    return <MetaDetail>{
        ...metaPreview,
        description: `<b>${video.title}</b>\n${video.description || ''}`,
        links: (video.tags || []).map(name => ({
            category: 'genre',
            name,
            url: `xnxx:${b64encode('/search/' + name)}`
        })),
        genres: video.tags,
        runtime: video.duration,
        background: video.thumbSlide || video.thumbnail,
        releaseInfo: `${video.views} views | ${video.likes} likes | ${video.dislikes} dislikes`
    };
}

export function toStreams(videoSources: VideoSource) {
    const qualities = videoSources.quailities
        .sort((a, b) => +b.quality.slice(0, -1) - +a.quality.slice(0, -1))
        .map(quality => <Stream>{
            name: 'XNXX',
            title: 'HLS ' + quality.quality,
            url: quality.sourceUrl
        }
    );
    return <Stream[]>[
        {
            name: 'XNXX',
            title: 'HLS Auto',
            url: videoSources.hlsAuto
        },
        ...qualities,
        {
            name: 'XNXX',
            title: 'MP4 high quality',
            url: videoSources.mp4High
        },
        {
            name: 'XNXX',
            title: 'MP4 low quality',
            url: videoSources.mp4Low
        }
    ];
}