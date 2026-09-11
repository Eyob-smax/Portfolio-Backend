import { prisma } from "./database.js";

/**
 * Recent dev-journal posts, newest first, optionally narrowed to a topic.
 *
 * The topic filter is built conditionally rather than passed through as
 * `contains: undefined`: an undefined `contains` leaves behind an empty `Tag`
 * predicate, which quietly turns the query into "posts that have at least one
 * tag" and drops every untagged post from the unfiltered listing.
 */
export async function fetchPosts(max: number = 12, topic?: string) {
  return prisma.post.findMany({
    take: max,
    orderBy: { date: "desc" },
    include: { PostTag: { include: { Tag: true } } },
    where: topic
      ? {
          OR: [
            { post: { contains: topic, mode: "insensitive" } },
            {
              PostTag: {
                some: {
                  Tag: { tag: { contains: topic, mode: "insensitive" } },
                },
              },
            },
          ],
        }
      : {},
  });
}
