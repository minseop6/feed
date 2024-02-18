export class Feed {
  constructor(
    private readonly id: number,
    private readonly title: string,
    private readonly content: string,
  ) {}

  public getId(): number {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getContent(): string {
    return this.content;
  }
}
