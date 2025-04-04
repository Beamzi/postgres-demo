import Image from "next/image";
import styles from "./page.module.css";
import prisma from "@/lib/prisma";
import Post from "./components/Post";
import Link from "next/link";

async function getPosts() {
    const posts = await prisma.post.findMany({
        where: {published: true},
        include: {
            author: {
                select: {name: true}
            }
        }
    })
    return posts
}

export default async function Home() {
    const posts = await getPosts()
  return (
    <main>
        <Link href="/add-post">Add Post</Link>
        <h1>feed</h1>

        {posts.map((item, index) => <Post authorName={item.author.name} content={item.content} title={item.title} id={item.id} key={item.id}>{item}</Post>)}

    </main>
  );
}
