import { VideoEmbedBlockProps } from '@/payload-types'

export async function VideoEmbedBlock({
	videoUrl,
}: VideoEmbedBlockProps): Promise<React.JSX.Element> {
	const videoId = videoUrl.match(
		/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
	)?.[1]

	return (
		<div className="safe-width relative float-none my-[2.5rem] w-full pb-6 pt-[50%] md:my-16">
			<iframe
				src={`https://www.youtube.com/embed/${videoId}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				className="absolute left-0 top-0 h-full w-full"
			></iframe>
		</div>
	)
}
