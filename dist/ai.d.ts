interface AiStreamChunk {
    data: string;
}
export declare const projects: {
    title: string;
    description: string;
    class: string[];
    tags: string[];
    source: string;
    visit: string;
    detailedDescription: string;
}[];
export declare const TimeLineData: {
    year: number;
    text: string;
}[];
export declare const tech_stack: {
    category: string;
    skills: {
        name: string;
        proficiency: string;
    }[];
}[];
export declare const experience: ({
    role: string;
    company: string;
    type: string;
    duration: string;
    period: string;
    responsibilities: string[];
    projects: string[];
    location: string;
    impact?: undefined;
} | {
    role: string;
    company: string;
    type: string;
    duration: string;
    period: string;
    responsibilities: string[];
    location: string;
    projects?: undefined;
    impact?: undefined;
} | {
    role: string;
    company: string;
    type: string;
    duration: string;
    period: string;
    responsibilities: string[];
    impact: string;
    location: string;
    projects?: undefined;
})[];
export declare const blogPosts: {
    id: number;
    title: string;
    category: string;
    topic: string;
    summary: string;
    link: string;
    tags: string[];
    date: string;
}[];
export declare function streamGroqResponse(topic: string): AsyncGenerator<AiStreamChunk, void, unknown>;
export {};
