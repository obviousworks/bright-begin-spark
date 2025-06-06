export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      challenges: {
        Row: {
          completed_at: string | null
          content: string
          correct_answer: string | null
          created_at: string | null
          description: string
          difficulty: string
          id: string
          options: string[] | null
          title: string
          topic: string
          type: string
          user_id: string
          xp_reward: number
        }
        Insert: {
          completed_at?: string | null
          content: string
          correct_answer?: string | null
          created_at?: string | null
          description: string
          difficulty: string
          id?: string
          options?: string[] | null
          title: string
          topic: string
          type: string
          user_id: string
          xp_reward: number
        }
        Update: {
          completed_at?: string | null
          content?: string
          correct_answer?: string | null
          created_at?: string | null
          description?: string
          difficulty?: string
          id?: string
          options?: string[] | null
          title?: string
          topic?: string
          type?: string
          user_id?: string
          xp_reward?: number
        }
        Relationships: []
      }
      quiz_results: {
        Row: {
          answers: Json
          completed_at: string | null
          experience_level: string
          familiar_topics: string[]
          id: string
          learning_goals: string[]
          primary_interest: string
          recommended_level: number
          time_commitment: string
          user_id: string
        }
        Insert: {
          answers: Json
          completed_at?: string | null
          experience_level: string
          familiar_topics: string[]
          id?: string
          learning_goals: string[]
          primary_interest: string
          recommended_level: number
          time_commitment: string
          user_id: string
        }
        Update: {
          answers?: Json
          completed_at?: string | null
          experience_level?: string
          familiar_topics?: string[]
          id?: string
          learning_goals?: string[]
          primary_interest?: string
          recommended_level?: number
          time_commitment?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed_challenges: number
          current_level: number
          id: string
          knowledge_score: number
          last_active: string | null
          streak: number
          strengths: string[] | null
          topics: string[] | null
          total_xp: number
          updated_at: string | null
          user_id: string
          weaknesses: string[] | null
        }
        Insert: {
          completed_challenges?: number
          current_level?: number
          id?: string
          knowledge_score?: number
          last_active?: string | null
          streak?: number
          strengths?: string[] | null
          topics?: string[] | null
          total_xp?: number
          updated_at?: string | null
          user_id: string
          weaknesses?: string[] | null
        }
        Update: {
          completed_challenges?: number
          current_level?: number
          id?: string
          knowledge_score?: number
          last_active?: string | null
          streak?: number
          strengths?: string[] | null
          topics?: string[] | null
          total_xp?: number
          updated_at?: string | null
          user_id?: string
          weaknesses?: string[] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      complete_challenge: {
        Args: { p_challenge_id: string; p_user_id: string; p_xp_earned: number }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
