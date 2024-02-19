export class Feed {
  constructor(
    private id: number,
    private schoolId: number,
    private title: string,
    private content: string,
    private createdAt: Date,
  ) {}

  public getId(): number {
    return this.id;
  }

  public getSchoolId(): number {
    return this.schoolId;
  }

  public getTitle(): string {
    return this.title;
  }

  public getContent(): string {
    return this.content;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public updateContent(title: string, content: string): void {
    this.title = title;
    this.content = content;
  }
}

export class CreateFeed {
  constructor(
    private readonly schoolId: number,
    private readonly title: string,
    private readonly content: string,
  ) {}

  public getSchoolId(): number {
    return this.schoolId;
  }

  public getTitle(): string {
    return this.title;
  }

  public getContent(): string {
    return this.content;
  }
}
