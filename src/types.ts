export interface ScholarCriterion {
  id?: string;
  number: string;
  title: string;
  description?: string;
  detailedRubric?: string;
  shortDesc?: string;
  fullDesc?: string;
  rubric?: string[];
}

export interface CareerMilestone {
  year: string;
  title: string;
  description: string;
  category: 'coaching' | 'academic' | 'honor';
}

export interface PledgeTier {
  id: string;
  amount: number;
  label: string;
  impact: string;
  isPopular?: boolean;
}
