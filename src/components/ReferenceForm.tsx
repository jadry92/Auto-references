import React from 'react';
import { ReferenceData } from './Main';

interface handelEventFunc {
  (event: any, index: number): void
}

interface IProps {
  data?: ReferenceData,
  index?: number,
  handelChange?: handelEventFunc,
  handelDelete?: handelEventFunc,
  handelSave?: handelEventFunc,
}

const ReferenceForm = ({ data, handelChange, handelDelete, handelSave, index }: IProps) => {

  const dataArray = [
    { value: data.title, name: 'Title', key: 'title' },
    { value: data.authorName, name: 'Author Name', key: 'authorName' },
    { value: data.authorSurname, name: 'Author Surname', key: 'authorSurname' },
    { value: data.yearPublish, name: 'Year Published', key: 'yearPublish' },
  ]

  return (
    <div className="row">
      <form action="" id="ref_form" className="col s12" onSubmit={(e) => handelSave(e, index)}>
        <div className="row mb-0">
          <div className="input-field col s4">
            {dataArray.map((item, i) => (
              <input
                key={i}
                type="text"
                name={item.name}
                className={item.value != '' ? "valid" : "invalid"}
                value={item.value}
                onChange={(e) => handelChange(e, index)}
                id={item.key}
                placeholder={item.name}
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="waves-effect waves-light btn">
          Save
        </button>
        <button
          type="reset"
          onClick={(e) => handelDelete(e, index)}
          className="waves-effect waves-light btn">
          Delete
        </button>
      </form >
    </div >
  )
}

export default ReferenceForm;
