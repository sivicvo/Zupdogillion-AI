import Image from "next/image";
import Link from "next/link";
import Header from "../lib/components/layout/header";
import Footer from "../lib/components/layout/footer";
import BannerGif from "../shared/assets/JB4o.gif";
import axios from "axios";
import TutorialCard from "@/lib/components/TutorialCard/TutorialCard";
import TutorialImg from "../shared/assets/tutorial.jpg";

interface Meme {
    url: string;
    id: string;
    name: string;
    width: number;
    height: number;
    box_count: number;
    caption: string;
}

const tutorials = [
    {
        id: 1,
        title: "Lorem ipsum dolor sit amet",
        description: "consectetur. Mi pretium augue ut sagittis.",
        imageUrl: TutorialImg,
    },
    {
        id: 2,
        title: "Lorem ipsum dolor sit amet",
        description: "consectetur. Mi pretium augue ut sagittis.",
        imageUrl: TutorialImg,
    },
    {
        id: 3,
        title: "Lorem ipsum dolor sit amet",
        description: "consectetur. Mi pretium augue ut sagittis.",
        imageUrl: TutorialImg,
    },
    {
        id: 4,
        title: "Lorem ipsum dolor sit amet",
        description: "consectetur. Mi pretium augue ut sagittis.",
        imageUrl: TutorialImg,
    },
    {
        id: 5,
        title: "Lorem ipsum dolor sit amet",
        description: "consectetur. Mi pretium augue ut sagittis.",
        imageUrl: TutorialImg,
    },
    {
        id: 6,
        title: "Lorem ipsum dolor sit amet",
        description: "consectetur. Mi pretium augue ut sagittis.",
        imageUrl: TutorialImg,
    },
];

export default async function Home() {
    const memes_data = await axios.get("https://api.imgflip.com/get_memes");
    // console.log("memes data from imgflip -> ", memes_data.data.data);
    const memes: Meme[] = memes_data.data.data.memes;

    return (
        <div className="bg-[#090e14]">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <section className="flex flex-col md:flex-row items-center justify-between my-16 gap-60">
                    <div className="md:w-1/2 mb-8 md:mb-0 gap-8">
                        <h2 className="text-5xl mb-6 text-blue-500 font-bold dark:text-gray-300">
                            Wellcome to Zupdogillion
                        </h2>
                        <h1 className="text-7xl md:text-7xl font-bold mb-4 text-gray-100 dark:text-white">
                            Turn text into memes with AI
                        </h1>
                        <h1 className="text-lg md:text-lg font-bold mb-4 text-gray-100 dark:text-white">
                            Turn text into memes with AITurn text into memes
                            with AITurn text into memes with AITurn text into
                            memes with AI
                        </h1>
                        <Link
                            href="/generate"
                            className="bg-blue-500 px-16 hover:bg-blue-600 text-white font-bold py-3 mt-5 rounded-lg text-lg transition duration-300"
                        >
                            Start
                        </Link>
                    </div>
                    <div className="md:w-1/2">
                        <Image
                            src={BannerGif}
                            alt="AI Meme Generator"
                            width={800}
                            height={600}
                            className="rounded-lg shadow-lg"
                            unoptimized={true}
                        />
                    </div>
                </section>

                <section className="mb-16 pt-16">
                    <h2 className="text-6xl font-bold mb-6 text-gray-100 dark:text-white">
                        <span className="text-blue-600"> Publish </span> and
                        <span className="text-blue-600"> Look </span>other{" "}
                        <div>memes from users</div>
                    </h2>
                    <Link
                        href="/all-memes"
                        className="bg-blue-500 px-16 hover:bg-blue-600 text-white font-bold py-3 mt-5 rounded-lg text-lg transition duration-300"
                    >
                        View All Memes
                    </Link>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
                        {memes.slice(0, 10).map((meme, index) => {
                            return (
                                <Image
                                    key={index}
                                    src={meme.url}
                                    alt="AI memes"
                                    width={400}
                                    height={400}
                                    unoptimized={true}
                                    layout="fixed"
                                />
                            );
                        })}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-6xl font-bold mb-6 text-gray-100 dark:text-white text-center">
                        Zupdogillion.ai Tutorial
                    </h2>
                    <p className="text-center pb-10 text-gray-300">
                        Why should you use Zupdogillion.ai to generate memes
                        over other popular tools?
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tutorials.map((item, index) => (
                            <TutorialCard
                                key={index}
                                id={item.id}
                                description={item.description}
                                title={item.title}
                                imageUrl={item.imageUrl}
                            />
                        ))}
                    </div>
                </section>

                {/* <section>
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                                How does the AI meme generator work?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Our AI analyzes your input and matches it with
                                suitable templates and images to create
                                hilarious memes tailored to your ideas.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                                Can I use the generated memes commercially?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                The memes generated are for personal use. For
                                commercial use, please check our licensing
                                options in the pricing section.
                            </p>
                        </div>
                    </div>
                </section> */}
            </div>
            <Footer />
        </div>
    );
}
