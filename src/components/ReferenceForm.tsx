import React from 'react';
import { ReferenceData } from '../main/DataStorage';

interface handelEventFunc {
  (event: any, index: number): void;
}

interface IProps {
  data?: ReferenceData;
  index?: number;
  handelChange?: handelEventFunc;
  handelDelete?: handelEventFunc;
  handelSave?: handelEventFunc;
}

const ReferenceForm = ({
  data,
  handelChange,
  handelDelete,
  handelSave,
  index
}: IProps): JSX.Element => {
  const dataArray = [
    { value: data.title, name: 'Title', key: 'title', styles: 'col s12' },
    {
      value: data.authorName,
      name: 'Author Name',
      key: 'authorName',
      styles: 'col s5'
    },
    {
      value: data.authorSurname,
      name: 'Author Surname',
      key: 'authorSurname',
      styles: 'col s5 offset-s1'
    },
    {
      value: data.yearPublish,
      name: 'Year Published',
      key: 'yearPublish',
      styles: 'col s3'
    }
  ];

  return (
    <div className="row">
      <form
        action=""
        id="ref_form"
        className="col s12"
        onSubmit={(e) => handelSave(e, index)}
      >
        <div className="row">
          {dataArray.map((item, i) => (
            <input
              key={i}
              type="text"
              name={item.name}
              className={
                item.value != ''
                  ? `valid ${item.styles}`
                  : `invalid ${item.styles}`
              }
              value={item.value}
              onChange={(e) => handelChange(e, index)}
              id={item.key}
              placeholder={item.name}
            />
          ))}
        </div>
        <div className="row">
          <div className="col 2s">
            <button type="submit" className="btn">
              Save
            </button>
          </div>
          <div className="col 2s ">
            <button
              type="reset"
              onClick={(e) => handelDelete(e, index)}
              className="btn red accent-3"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReferenceForm;