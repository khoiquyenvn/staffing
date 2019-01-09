import _ from 'lodash/fp';

export const EmptyGuid = '00000000-0000-0000-0000-000000000000';

export function getDefaultDropdownObject(propertyName) {
  return {
    value: '00000000-0000-0000-0000-000000000000',
    label: '',
    propertyName: propertyName
  };
}

export function getOptionsForDropdown(realOptions, propertyName) {
  let values = [
    getDefaultDropdownObject()
  ];
  let realValues = realOptions.map(option => {
    return {
      value: option.Id,
      label: option.Name,
      propertyName: propertyName
    }
  });

  return _.concat(values, realValues);
}

export function getStaffingResults() {
  let employeeResults = [
    {
      Id: 795,
      DisplayId: '0795',
      Name: 'An Tran Truong Le',
      PhotoURL: 'http://localhost:58955/resources/photo/employees/anle.jpg',
      Title: {
        Id: '82e8f005-00db-4954-a1de-d6e43b037002',
        Name: 'Senior Sofware Engineer'
      },
      RequestId:'82e8f005-00db-4954-a1de-d6e43baaa001'
    },
    {
      Id: 861,
      DisplayId: '0861',
      Name: 'Khoi Minh Nguyen',
      PhotoURL: 'http://localhost:58955/resources/photo/employees/khoinguyen.jpg',
      Title: {
        Id: '82e8f005-00db-4954-a1de-d6e43b037002',
        Name: 'Senior Sofware Engineer'
      },
      RequestId:'82e8f005-00db-4954-a1de-d6e43baaa002'
    },
    {
      Id: 1513,
      DisplayId: '1513',
      Name: 'Trang Thi Dieu Ha',
      PhotoURL: 'http://localhost:58955/resources/photo/employees/trangha.png',
      Title: {
        Id: '82e8f005-00db-4954-a1de-d6e43b037002',
        Name: 'Senior Sofware Engineer'
      },
      RequestId:'82e8f005-00db-4954-a1de-d6e43baaa001',
      EmployeeSkill: [
        {
          Skill: {
            Name: "C#",
          }
        },
        {
          Skill: {
            Name: "Javascript",
          }
        }
      ]
    },
    {
      Id: 731,
      DisplayId: '0731',
      Name: 'Vi Hanh Phung',
      PhotoURL: 'http://localhost:58955/resources/photo/employees/viphung.jpg',
      Title: {
        Id: '82e8f005-00db-4954-a1de-d6e43b037005',
        Name: 'Senior QA Engineer'
      },
      RequestId:'82e8f005-00db-4954-a1de-d6e43baaa002'
    },
    {
      Id: 2000,
      DisplayId: '2000',
      Name: 'New Employee',
      PhotoURL: 'http://localhost:58955/resources/photo/employees/default.png',
      Title: {
        Id: '82e8f005-00db-4954-a1de-d6e43b037005',
        Name: 'Senior QA Engineer'
      },
    },
    {
      Id: 2001,
      DisplayId: '2001',
      Name: 'New Employee',
      PhotoURL: 'http://localhost:58955/resources/photo/employees/default.png',
      Title: {
        Id: '82e8f005-00db-4954-a1de-d6e43b037005',
        Name: 'Senior QA Engineer'
      },
    },
    {
      Id: 2002,
      DisplayId: '2001',
      Name: 'New Employee',
      PhotoURL: 'http://localhost:58955/resources/photo/employees/default.png',
      Title: {
        Id: '82e8f005-00db-4954-a1de-d6e43b037005',
        Name: 'Senior QA Engineer'
      },
    },
    {
      Id: 2003,
      DisplayId: '2001',
      Name: 'New Employee',
      PhotoURL: 'http://localhost:58955/resources/photo/employees/default.png',
      Title: {
        Id: '82e8f005-00db-4954-a1de-d6e43b037005',
        Name: 'Senior QA Engineer'
      },
    }
  ];
  return employeeResults;
}

export function getSuggestedEmployeeByRequest(requestId) {
  let employeeResults = [    
    {
      Id: 795,
      DisplayId: '0795',
      Name: 'An Tran Truong Le',
      PhotoURL: 'http://localhost:58955/resources/photo/employees/anle.jpg',
      Title: {
        Id: '82e8f005-00db-4954-a1de-d6e43b037002',
        Name: 'Senior Sofware Engineer'
      },
      RequestId:'82e8f005-00db-4954-a1de-d6e43baaa002'
    },
    {
      Id: 1513,
      DisplayId: '1513',
      Name: 'Trang Thi Dieu Ha',
      PhotoURL: 'http://localhost:58955/resources/photo/employees/trangha.png',
      Title: {
        Id: '82e8f005-00db-4954-a1de-d6e43b037002',
        Name: 'Senior Sofware Engineer'
      },
      RequestId:'82e8f005-00db-4954-a1de-d6e43baaa002',
      EmployeeSkill: [
        {
          Skill: {
            Name: "C#",
          }
        },
        {
          Skill: {
            Name: "Javascript",
          }
        }
      ]
    },    
    {
      Id: 2000,
      DisplayId: '2000',
      Name: 'New Employee',
      PhotoURL: 'http://localhost:58955/resources/photo/employees/default.png',
      Title: {
        Id: '82e8f005-00db-4954-a1de-d6e43b037005',
        Name: 'Senior QA Engineer'
      },
      RequestId:'82e8f005-00db-4954-a1de-d6e43baaa002',
    },
    {
      Id: 2001,
      DisplayId: '2000',
      Name: 'New Employee 2',
      PhotoURL: 'http://localhost:58955/resources/photo/employees/default.png',
      Title: {
        Id: '82e8f005-00db-4954-a1de-d6e43b037005',
        Name: 'Senior QA Engineer'
      },
      RequestId:'82e8f005-00db-4954-a1de-d6e43baaa002',
    }
  ];

  let results=[];
  results = employeeResults.map(r => {
    if (r.RequestId == requestId)
    {
      return r;
    }
  });

  return results;
}