import { prisma } from "./database.js";
export async function fetchPosts(max = 12, topic) {
    try {
        const result = await prisma.post.findMany({
            take: max,
            orderBy: { date: "desc" },
            include: { PostTag: { include: { Tag: true } } },
            where: {
                OR: [
                    {
                        PostTag: {
                            some: { Tag: { tag: { contains: topic } } },
                        },
                    },
                ],
            },
        });
        if (!result) {
            return new Error("Cna't find posts");
        }
        return result;
    }
    catch (err) {
        console.error("Error fetching posts:", err);
        throw err;
    }
}
//# sourceMappingURL=post.js.map