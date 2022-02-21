// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  response,
} from '@loopback/rest';
import { start } from 'repl';
import {DataPointRepository} from '../repositories';


export class MetricsController {
  constructor(
    @repository(DataPointRepository)
    public dataPointRepository : DataPointRepository,
  ) {}

  @get('/historical-data/{device_id}')
  @response(200)
  async find( 
    @param.path.string('device_id') device_id?: string,
    @param.query.dateTime('start_date') start_date?: Date,
    @param.query.dateTime('end_date') end_date?: Date): Promise<{
      averages: Array<number>,
      mins: Array<number>,
      maxs: Array<number>,
      periods: Array<number>,
    }> {


        /**
         * This is not because allows SQL Injection.
         */

    //start_date = start_date
        
    const metrics = await this.dataPointRepository.execute(`
        select 
            (select min(value) FROM datapoint WHERE timestamp BETWEEN dd AND dd + interval '10' minute AND device_id='${device_id}') as min,
            (select max(value) FROM datapoint WHERE timestamp BETWEEN dd AND dd + interval '10' minute AND device_id='${device_id}') as max,
            (select avg(value) FROM datapoint WHERE timestamp BETWEEN dd AND dd + interval '10' minute AND device_id='${device_id}') as average,
            dd as period
        from 
            generate_series (to_timestamp(${start_date?.getTime()} / 1000.0)  , to_timestamp((${end_date?.getTime()}) / 1000.0), '10 minute'::interval) dd;
    `) as Array<any>;

    const averages = [];
    const mins = [];
    const maxs = [];
    const periods = [];

    for (const metric of metrics) {
        if (metric.average == null ||
            metric.min == null ||
            metric.max == null ||
            metric.period == null) {
            continue;
        }

        averages.push(metric.average);
        mins.push(metric.min);
        maxs.push(metric.max);
        periods.push(metric.period);
    }

    return { averages, mins, maxs, periods };
  }
}
