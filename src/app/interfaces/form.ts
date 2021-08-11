export interface Form {
    id: number;
    name:string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    created_by: number | null;
    updated_by: number | null;
    deleted_by: number | null;
}
