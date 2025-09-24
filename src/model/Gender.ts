export const Gender = {
    MALE: 'Male',
    FEMALE: 'Female',
    NONBINARY: 'Non-Binary'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];