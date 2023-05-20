import Image from "next/image";

const getData = async (id) => {
	const data = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`,
		{
			next: {
				revalidate: 0,
			},
		}
	);
	const res = await data.json();
	return res;
};

export const generateMetadata = async ({ params }) => {
	const data = await getData(params.id);
	return {
		title: data.title,
		description: data.overview,
		openGraph: {
			title: data.title,
			description: data.overview,
			url: "https://nextjs.org",
			siteName: "Next.js",
			images: [
				{
					url: "https://image.tmdb.org/t/p/original" + data.poster_path,
					width: 800,
					height: 600,
				},
				{
					url: "https://image.tmdb.org/t/p/original" + data.backdrop_path,
					width: 1800,
					height: 1600,
					alt: "My custom alt",
				},
			],
			locale: "en-US",
			type: "website",
		},
	};
};

const MovieDetail = async ({ params }) => {
	const imagePath = "https://image.tmdb.org/t/p/original";

	const res = await getData(params.id);
	return (
		<div>
			<div>
				<h2 className="text-2xl">{res.title}</h2>
				<h2 className="text-lg">{res.release_date}</h2>
				<h2>Runtime:{res.runtime} minutes</h2>
				<h2 className="bg-green-600 inline-block my-2 py-2 px-4 rounded-md text-sm">
					{res.status}
				</h2>
				<Image
					className="my-12 w-full"
					src={imagePath + res.backdrop_path}
					width={1000}
					height={1000}
					alt={res.title}
					priority
				/>
				<h2>{res.overview}</h2>
			</div>
		</div>
	);
};

export default MovieDetail;
