import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {DataPoint} from '../models';
import {DataPointRepository} from '../repositories';

export class DataPointController {
  constructor(
    @repository(DataPointRepository)
    public dataPointRepository : DataPointRepository,
  ) {}

  @post('/data-points')
  @response(200, {
    description: 'DataPoint model instance',
    content: {'application/json': {schema: getModelSchemaRef(DataPoint)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DataPoint, {
            title: 'NewDataPoint',
          }),
        },
      },
    })
    dataPoint: Omit<DataPoint, 'id'>,
  ): Promise<DataPoint> {
    return this.dataPointRepository.create(dataPoint);
  }

  @get('/data-points/count')
  @response(200, {
    description: 'DataPoint model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DataPoint) where?: Where<DataPoint>,
  ): Promise<Count> {
    return this.dataPointRepository.count(where);
  }

  @get('/data-points')
  @response(200, {
    description: 'Array of DataPoint model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DataPoint, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DataPoint) filter?: Filter<DataPoint>,
  ): Promise<DataPoint[]> {
    return this.dataPointRepository.find(filter);
  }

  @patch('/data-points')
  @response(200, {
    description: 'DataPoint PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DataPoint, {partial: true}),
        },
      },
    })
    dataPoint: DataPoint,
    @param.where(DataPoint) where?: Where<DataPoint>,
  ): Promise<Count> {
    return this.dataPointRepository.updateAll(dataPoint, where);
  }

  @get('/data-points/{id}')
  @response(200, {
    description: 'DataPoint model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DataPoint, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DataPoint, {exclude: 'where'}) filter?: FilterExcludingWhere<DataPoint>
  ): Promise<DataPoint> {
    return this.dataPointRepository.findById(id, filter);
  }

  @patch('/data-points/{id}')
  @response(204, {
    description: 'DataPoint PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DataPoint, {partial: true}),
        },
      },
    })
    dataPoint: DataPoint,
  ): Promise<void> {
    await this.dataPointRepository.updateById(id, dataPoint);
  }

  @put('/data-points/{id}')
  @response(204, {
    description: 'DataPoint PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() dataPoint: DataPoint,
  ): Promise<void> {
    await this.dataPointRepository.replaceById(id, dataPoint);
  }

  @del('/data-points/{id}')
  @response(204, {
    description: 'DataPoint DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.dataPointRepository.deleteById(id);
  }
}
