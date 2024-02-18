export class School {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly region: string,
  ) {}

  public getId(): Readonly<number> {
    return this.id;
  }

  public getName(): Readonly<string> {
    return this.name;
  }

  public getRegion(): Readonly<string> {
    return this.region;
  }
}

export class CreateSchool {
  constructor(
    private readonly name: string,
    private readonly region: string,
  ) {}

  public getName(): Readonly<string> {
    return this.name;
  }

  public getRegion(): Readonly<string> {
    return this.region;
  }
}
