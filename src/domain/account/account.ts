import { AccountType } from 'src/type/enum/account-type.enum';

export class Account {
  constructor(
    private readonly id: number,
    private readonly type: AccountType,
    private readonly email: string,
    private readonly name: string,
    private readonly password: string,
  ) {}

  public getId(): Readonly<number> {
    return this.id;
  }

  public getType(): Readonly<AccountType> {
    return this.type;
  }

  public getEmail(): Readonly<string> {
    return this.email;
  }

  public getName(): Readonly<string> {
    return this.name;
  }

  public getPassword(): Readonly<string> {
    return this.password;
  }
}

export class CreateAccount {
  constructor(
    private readonly type: AccountType,
    private readonly email: string,
    private readonly name: string,
    private readonly password: string,
  ) {}

  public getType(): Readonly<AccountType> {
    return this.type;
  }

  public getEmail(): Readonly<string> {
    return this.email;
  }

  public getName(): Readonly<string> {
    return this.name;
  }

  public getPassword(): Readonly<string> {
    return this.password;
  }
}
