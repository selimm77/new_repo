/*
    // datacheck model
{
  linesCount,
  errors:
  [
    {
      fieldCode,
      errorLines: [],
      errorMessages: [],
    },
    ...
  ],
  warnings:
  [
    {
      fieldCode,
      errorLines: [],
      errorMessages: [],
    },
    ...
  ]
}



errors:
  [
    {
      fieldCode,
      errorLines: [],
      errorType: string,
    },
    ...
  ],

  // new structure
"accuracy": {
  "NOTEMPTY": [0,1,2,3,4,5,6,7,8,9],
  "REFERENCE": [2,6,8,5,]
}

*/

export const datacheckModel = {
    linesCount: 30,
    errors:
        [
            {
                fieldCode: 'accuracy',
                errorLines: [1, 2, 3, 7],
                errorMessages: ['valide', 'notEmpty', 'ref'],
            },
            {
                fieldCode: 'fieldCodeState',
                errorLines: [9],
                errorMessages: ['notNull'],
            },
            {
                fieldCode: 'fieldCodeDivision',
                errorLines: [2, 4],
                errorMessages: ['valid', 'notNull'],
            },
            {
                fieldCode: 'fieldCodeBiValue',
                errorLines: [11, 23, 37, 40, 44],
                errorMessages: ['valide', 'notEmpty', 'ref', 'notEmpty', 'ref'],
            },
    ],
    warnings:
        [
            {
                fieldCode: 'fieldCodeAccuracy',
                errorLines: [5, 17],
                errorMessages: ['warning', 'warning'],
            },
            {
                fieldCode: 'fieldCodeState',
                errorLines: [13],
                errorMessages: ['warning'],
            }
  ]
}