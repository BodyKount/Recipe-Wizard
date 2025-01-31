import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface VolunteerAttributes {
  id: number;
  volunteerName: string;
}

interface VolunteerCreationAttributes extends Optional<VolunteerAttributes, 'id'> {}

export class Volunteer extends Model<VolunteerAttributes, VolunteerCreationAttributes> implements VolunteerAttributes {
  /* TODO: 
    Create id and volunteerName properties
    id: public & number
    volunteerName: public & string
  */
}

export function VolunteerFactory(sequelize: Sequelize): typeof Volunteer {
  // TODO: Initialize the Volunteer Model
  return Volunteer;
}
