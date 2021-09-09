import React from 'react';

interface handelEventFunc {
  (event: any, index: number): void;
}

interface IProps {
  link?: string;
  index?: number;
  handelChange?: handelEventFunc;
  handelSave?: handelEventFunc;
  handelDelete?: handelEventFunc;
}

const UrlForm = ({
  link,
  index,
  handelChange,
  handelSave,
  handelDelete
}: IProps): JSX.Element => {
  return (
    <div className="row">
      <form
        action=""
        id="ref_form"
        className="col s12"
        onSubmit={(e) => handelSave(e, index)}
      >
        <div className="row">
          <div className="col s12">
            <input
              type="text"
              name="link"
              className="invalid"
              value={link}
              onChange={(e) => handelChange(e, index)}
              id="link"
              placeholder="link"
            />
          </div>
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

export default UrlForm;
