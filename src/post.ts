import { prisma } from "./database.js";

export interface IPost {
  post: string;
  date_string: string;
  date: Date;
  post_link: string;
  tags: string[];
}

export async function fetchPosts(topic?: string, max: number = 12) {
  try {
    return await prisma.post.findMany({
      take: max,
      orderBy: { date: "desc" },
      include: { PostTag: { include: { Tag: true } } },
      where: {
        OR: [
          {
            PostTag: {
              some: { Tag: { tag: { contains: topic as string } } },
            },
          },
        ],
      },
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
}
