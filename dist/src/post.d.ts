export interface IPost {
    post: string;
    date_string: string;
    date: Date;
    post_link: string;
    tags: string[];
}
export declare function fetchPosts(max?: number, topic?: string): Promise<Error | ({
    PostTag: ({
        Tag: {
            id: number;
            tag: string;
        };
    } & {
        postId: number;
        tagId: number;
    })[];
} & {
    date: Date;
    createdAt: Date;
    id: number;
    post: string;
    post_link: string | null;
    date_string: string;
    updatedAt: Date;
})[]>;
//# sourceMappingURL=post.d.ts.map