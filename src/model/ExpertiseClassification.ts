export const ExpertiseClassification = {
    NOVICE: 'Novice',
    INTERMEDIATE: 'Intermediate',
    EXPERT: 'Expert'
} as const;

export type ExpertiseClassification = typeof ExpertiseClassification[keyof typeof ExpertiseClassification];