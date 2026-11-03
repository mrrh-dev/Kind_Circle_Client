export type EventItem = {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  createdBy: string;
  creatorName: string;
  creatorPhoto: string;
  participantCount: number;
  createdAt: string;
};

export type JoinedEvent = {
  joinId: string;
  joinedAt: string;
  event: EventItem;
};

export type EventFormValues = {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  /** value of an <input type="datetime-local"> */
  eventDate: string;
};

export type FieldErrors<T extends string = string> = Partial<Record<T, string>>;
