import React from 'react';
import Workbook from 'react-excel-workbook'

const DIY = () => {
    const data1 = [
        {
          foo: '123',
          bar: '456',
          baz: '789'
        },
        {
          foo: 'abc',
          bar: 'dfg',
          baz: 'hij'
        },
        {
          foo: 'aaa',
          bar: 'bbb',
          baz: 'ccc'
        }
      ]

    return (
        <div className="row text-center" style={{marginTop: '100px'}}>
        <Workbook filename="example.xlsx" element={<button className="btn btn-lg btn-primary">Try me!</button>}>
          <Workbook.Sheet data={data1} name="Sheet A">
            <Workbook.Column label="Foo" value="foo"/>
            <Workbook.Column label="Bar" value="bar"/>
            <Workbook.Column label="Baz" value="baz"/>
          </Workbook.Sheet>
        </Workbook>
      </div>
    );
};

export default DIY;