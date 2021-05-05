import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Company {
  readonly id: string;
  readonly companyName?: string;
  readonly Users?: (User | null)[];
  readonly Properties?: (Property | null)[];
  constructor(init: ModelInit<Company>);
  static copyOf(source: Company, mutator: (draft: MutableModel<Company>) => MutableModel<Company> | void): Company;
}

export declare class User {
  readonly id: string;
  readonly userType: string;
  readonly email?: string;
  readonly companyID?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Property {
  readonly id: string;
  readonly propertyCity: string;
  readonly propertyAddress: string;
  readonly propertyState: string;
  readonly propertyZip: string;
  readonly lastServiceDate?: number;
  readonly tags?: (Tag | null)[];
  readonly companyID?: string;
  constructor(init: ModelInit<Property>);
  static copyOf(source: Property, mutator: (draft: MutableModel<Property>) => MutableModel<Property> | void): Property;
}

export declare class Tag {
  readonly id: string;
  readonly unitMake: string;
  readonly unitModel: string;
  readonly lastServiceDate: string;
  readonly description: string;
  readonly propertyID?: string;
  readonly Reports?: (Report | null)[];
  constructor(init: ModelInit<Tag>);
  static copyOf(source: Tag, mutator: (draft: MutableModel<Tag>) => MutableModel<Tag> | void): Tag;
}

export declare class Report {
  readonly id: string;
  readonly serviceDate?: number;
  readonly servicerName?: string;
  readonly serviceType?: string;
  readonly serviceNotes?: string;
  readonly tagID?: string;
  constructor(init: ModelInit<Report>);
  static copyOf(source: Report, mutator: (draft: MutableModel<Report>) => MutableModel<Report> | void): Report;
}