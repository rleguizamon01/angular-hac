import { PropertySurvey } from "./property-survey";

export interface Link {
    url: string | null;
    label: string | null;
    active: boolean;
}

export interface PropertySurveyPagination {
    current_page: number;
    data: PropertySurvey[];
    first_page_url: string | null;
    from: any;
    last_page: number;
    last_page_url: string | null;
    links: Link;
    next_page_url: string | null;
    path: string | null;
    per_page: number;
    prev_page_url: string | null;
    to: any;
    total: number;
}
