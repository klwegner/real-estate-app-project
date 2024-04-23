
export const filterData = [

    {
      items: [
        { name: 'Buy', value: 'For Sale' },
        { name: 'Rent', value: 'Rental' },
        { name: 'All', value: 'all' },

      ],
      placeholder: 'Property Type',
      queryName: 'propertyType',
    },
    {
      items: [
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 },
        { name: '6', value: 6 },
        { name: '7', value: 7 },
        { name: '8', value: 8 },
        { name: '9', value: 9 },
        { name: '10', value: 10 },
        { name: 'All', value: 'all' },
      ],
      placeholder: 'Beds',
      queryName: 'numBeds',
    },
    {
      items: [
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 },
        { name: '6', value: 6 },
        { name: '7', value: 7 },
        { name: '8', value: 8 },
        { name: '9', value: 9 },
        { name: '10', value: 10 },
        { name: 'All', value: 'all' },
      ],
      placeholder: 'Baths',
      queryName: 'numBaths',
    }
    // {
    //   items: [
    //     { name: 'True', value: 'true' },
    //     { name: 'False', value: 'false' },
    //     { name: 'All', value: 'all' },

    //   ],
    //   placeholder: 'Flood Zone?',
    //   queryName: 'inFloodZone',
    // },
    // {
    //   items: [
    //     { name: 'True', value: 'true' },
    //     { name: 'False', value: 'false' },
    //     { name: 'All', value: 'all' },

    //   ],
    //   placeholder: 'has HOA?',
    //   queryName: 'hasHOA',
    // }
  ];
  
  export const getFilterValues = (filterValues) => {
    const {
      propertyType,
      numBaths,
      numBeds,
      inFloodZone,
      hasHOA

    } = filterValues;
  
    const values = [
      {
        name: 'propertyType',
        value: propertyType,
      },
      {
        name: 'numBaths',
        value: numBaths,
      },
      {
        name: 'numBeds',
        value: numBeds,
      },
      {
        name: 'inFloodZone',
        value: inFloodZone,
      },
      {
        name: 'hasHOA',
        value: hasHOA,
      }
    ];
  
    return values;
  };