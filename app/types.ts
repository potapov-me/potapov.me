export interface Project {
    id: number;
    name: string;
    description: string;
    url: string;
    icon: string;
    stack: string[];
    repo?: string;
}

export interface RouteContext {
    params: {
        id: string;
    }
}