export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  total_points: number;
  created_at: string;
};

export type Progress = {
  id: string;
  user_id: string;
  section_id: string;
  completed: boolean;
  completed_at: string | null;
  points_earned: number;
};

export type LeaderboardEntry = {
  id: string;
  full_name: string;
  avatar_url: string;
  total_points: number;
  sections_completed: number;
};
