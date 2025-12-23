import { prisma } from "./database.js";

export interface IPost {
  post: string;
  date_string: string;
  date: Date;
  post_link: string;
  tags: string[];
}

export async function fetchPosts(max: number = 12, topic?: string) {
  try {
    const result = await prisma.post.findMany({
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
    if (!result) {
      return new Error("Cna't find posts");
    }
    return result;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
}
