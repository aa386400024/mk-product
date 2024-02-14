export interface Chat {
    id: number;
    content: string;
    pinned: boolean;
    timestamp: string; // Or Date, depending on the format you receive from the backend
  }
  
  export interface CategorizedChats {
    today: Chat[];
    yesterday: Chat[];
    last7Days: Chat[];
    last30Days: Chat[];
    // Any other categories can be added here
  }
  