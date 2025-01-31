import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { Volunteer } from './volunteer.js';

interface WorkAttributes {
  id: number;
  name: string;
  status: string;
  description: string;
  assignedVolunteerId?: number;
}

interface WorkCreationAttributes extends Optional<WorkAttributes, 'id'> {}

export class Work extends Model<WorkAttributes, WorkCreationAttributes> implements WorkAttributes {
  /* TODO: 
    Create properties of Work:
    id: public & number
    name: public & string
    status: public & string
    description: public & string
    assignedVolunteerId: public & number
    assignedVolunteer: public, readonly, Volunteer object as associated Volunteer mode;
  */
}

export function WorkFactory(sequelize: Sequelize): typeof Work {
  // TODO: Initialize the Work Model
  return Work;
}
