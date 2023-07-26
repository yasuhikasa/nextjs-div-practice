// 経験レベルを列挙型として定義します
enum ExperienceLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Expert = "Expert",
}

// Skillオブジェクトの型を定義します
export interface Skill {
  id: number;
  skillName: string;
  experienceRequired: ExperienceLevel;
}
