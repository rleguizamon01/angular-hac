import { Field } from "./field";
import { Form } from "./form";

export interface Page {
    id: number;
    form_id: number;
    name: string;
    form: Form;
    fields: Field[] | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    created_by: number | null;
    updated_by: number | null;
    deleted_by: number | null;
}
