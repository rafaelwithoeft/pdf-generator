import { JSONSchemaFaker } from 'json-schema-faker'

export type Product = {
  id: string
  name: string
  image: string
  value: number
}

async function generateData() {
  const schema = {
    type: 'object',
    properties: {
      products: {
        type: 'array',
        required: ['id', 'name', 'value'],
        minItems: 2000,
        maxItems: 4000,
        items: {
          id: {
            $ref: '#/definitions/positiveInt'
          },
          name: {
            type: 'string',
            faker: 'name.fullName'
          },
          value: {
            type: 'number'
          },
          image: {
            type: 'string',
            enum: [
              'https://loremflickr.com/cache/resized/65535_52867865931_1b9fe658a1_300_300_nofilter.jpg'
            ]
          }
        }
      }
    },
    required: ['products'],
    definitions: {
      positiveInt: {
        type: 'integer',
        minimum: 0,
        exclusiveMinimum: true
      }
    }
  }

  // @ts-expect-error Ignore, schema is valid, why this lib show an error?
  return JSONSchemaFaker.resolve(schema)
}

export default {
  columns: [
    { name: '#' },
    { name: 'Código' },
    { name: 'Nome' },
    { name: 'Valor' }
  ],
  generateValues: generateData
}
