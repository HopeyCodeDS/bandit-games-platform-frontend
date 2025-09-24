interface Achievement {
    userId: string;
    achievementId: string;
    achievementName: string;
    gameName: string;
    timestamp: string | null;
    locked: boolean;
}

export default Achievement;