import {Entity, model, property} from '@loopback/repository';

@model()
export class DataPoint extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  device_id: string;

  @property({
    type: 'date',
    required: true,
  })
  timestamp: string;

  @property({
    type: 'string',
    required: true,
  })
  metric_id: string;

  @property({
    type: 'number',
    required: true,
    "postgresql": {
      "dataType": "NUMERIC(10,2)"
    }
  })
  value: number;


  constructor(data?: Partial<DataPoint>) {
    super(data);
  }
}

export interface DataPointRelations {
  // describe navigational properties here
}

export type DataPointWithRelations = DataPoint & DataPointRelations;
