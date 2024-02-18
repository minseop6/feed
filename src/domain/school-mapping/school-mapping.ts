export class SchoolMapping {
  constructor(
    private readonly schoolId: number,
    private readonly accountId: number,
    private readonly deletedAt?: Date,
  ) {}

  public getSchoolId(): number {
    return this.schoolId;
  }

  public getAccountId(): number {
    return this.accountId;
  }

  public getDeletedAt(): Date | undefined {
    return this.deletedAt;
  }
}
