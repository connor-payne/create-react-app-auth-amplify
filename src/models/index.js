// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Company, User, Property, Tag, Report } = initSchema(schema);

export {
  Company,
  User,
  Property,
  Tag,
  Report
};