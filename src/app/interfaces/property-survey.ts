import { Form } from "./form";
import { User } from "./user";
import { Orientation } from "./orientation";
import { PropertySurveyStatus } from "./property-survey-status";
import { PropertyType } from "./property-type";

export interface PropertySurvey {
    id: number;
    assigned_user_id: number;
    user: User;
    meeting_date: string;
    contact: string;
    address: string;
    latitude: string | null;
    longitude: string | null;
    property_type_id: number;
    property_type: PropertyType;
    typology: string | null;
    uncovered_surface: number | null;
    covered_surface: number | null;
    front_surface: number | null;
    back_surface: number | null;
    property_identification: string | null;
    departure_matrix: string | null;
    orientation_id: number | null;
    orientation: Orientation;
    observations: string | null | null;
    form_id: number | null;
    form: Form;
    property_survey_status_id: number | null;
    property_survey_status: PropertySurveyStatus;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    created_by: number | null;
    updated_by: number | null;
    deleted_by: number | null;
}
