import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresSqlDataSource} from '../datasources';
import {DataPoint, DataPointRelations} from '../models';

export class DataPointRepository extends DefaultCrudRepository<
  DataPoint,
  typeof DataPoint.prototype.id,
  DataPointRelations
> {
  constructor(
    @inject('datasources.PostgresSQL') dataSource: PostgresSqlDataSource,
  ) {
    super(DataPoint, dataSource);
  }
}
