import React, { useState } from 'react';
import { ReferenceData } from '../../main/DataStorage';

interface IProps {
  reference?: ReferenceData;
}

const ReferenceForm = ({ reference }: IProps): JSX.Element => {
  const [title, setTitle] = useState(reference.title);
  const [authorName, setAuthorName] = useState(reference.authorName);
  const [authorSurname, setAuthorSurname] = useState(reference.authorSurname);
  const [yearPublish, setYearPublish] = useState(reference.yearPublish);
  const [URL, setURL] = useState(reference.URL);

  const handelChangeForm = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunc: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    setFunc(event.target.value);
  };

  const handelDeleteRef = (event: React.FormEvent) => {
    event.preventDefault();
    window.electron.dataAPI.deleteReference(reference.id);
  };

  const handelSaveForm = (event: React.FormEvent) => {
    event.preventDefault();
    const updateRef = { ...reference };
    updateRef.title = title;
    updateRef.authorName = authorName;
    updateRef.authorSurname = authorSurname;
    updateRef.yearPublish = yearPublish;
    updateRef.URL = URL;
    window.electron.dataAPI.updateReference(updateRef);
  };

  return (
    <div className="row">
      <form
        action=""
        id="ref_form"
        className="col s12"
        onSubmit={(e) => handelSaveForm(e)}
      >
        <div className="row">
          <div className="col s12">
            <input
              type="text"
              name="Title"
              className={title !== '' ? `valid` : `invalid`}
              value={title}
              onChange={(e) => handelChangeForm(e, setTitle)}
              id="title"
              placeholder="Title"
            />
          </div>
        </div>
        <div className="row">
          <div className="col s5">
            <input
              type="text"
              name="Author Name"
              className={authorName !== '' ? `valid` : `invalid`}
              value={authorName}
              onChange={(e) => handelChangeForm(e, setAuthorName)}
              id="authorName"
              placeholder="Author Name"
            />
          </div>
          <div className="col s5 offset-s1">
            <input
              type="text"
              name="Author Surname"
              className={authorSurname !== '' ? `valid` : `invalid`}
              value={authorSurname}
              onChange={(e) => handelChangeForm(e, setAuthorSurname)}
              id="authorSurname"
              placeholder="Author Surname"
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <input
              type="text"
              name="YearPublish"
              className={yearPublish !== '' ? `valid` : `invalid`}
              value={yearPublish}
              onChange={(e) => handelChangeForm(e, setYearPublish)}
              id="yearPublish"
              placeholder="Year Publish"
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <input
              type="text"
              name="URL"
              className={URL !== '' ? `valid` : `invalid`}
              value={URL}
              onChange={(e) => handelChangeForm(e, setURL)}
              id="URL"
              placeholder="Year Publish"
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
              onClick={(e) => handelDeleteRef(e)}
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
