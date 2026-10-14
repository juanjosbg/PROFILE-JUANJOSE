export type SkillItem = {
  name: string;
  level: 'intermediate' | 'advanced';
};

export type SkillCategory = {
  title: string;
  skills: SkillItem[];
};

