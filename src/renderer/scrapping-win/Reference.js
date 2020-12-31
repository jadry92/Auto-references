class Reference {

  constructor(data) {
    this.data = data
    this._toggleFormData = this._toggleFormData.bind(this)
    this._createElement()
  }

  _checkValues() {
    let checkFlag = true
    for (const index of Object.keys(this.data)) {
      if (this.data[index] === '') {
        this[index + 'State'] = 'invalid';
        checkFlag = false
      } else {
        this[index + 'State'] = 'valid';
      }
    }
    return checkFlag;
  }

  _createReference() {
    if (this._checkValues()) {
      if (this.data.authorSurname === this.data.authorName) {
        return `${this.data.authorSurname}. (${this.data.yearPublish}). ${this.data.title}. Retrieved from &lt;${this.data.URL}&gt;`
      } else {
        return `${this.data.authorSurname}, ${this.data.authorName[0]} . (${this.data.yearPublish}). ${this.data.title}. Retrieved from &lt;${this.data.URL}&gt;`
      }
    } else {
      return 'Some Data is missing'
    }
  }

  _createReferenceForm() {
    return `<div class="row">
    <form action="" id="ref_form" class="col s12">
      <div class="row mb-0">
        <div class="input-field col s4">
          <input type="text" name="authorName" class="${this.authorNameState}" value="${this.data.authorName}" placeholder="${this.data.authorName}">
          <label for="authorName">First Name</label>
        </div>
        <div class="input-field col s4">
          <input type="text" name="authorSurname" value="${this.data.authorSurname}" class="${this.authorSurnameState}">
          <label for="authorSurname">Last Name</label>
        </div>
        <div class="input-field col s4">
          <input type="text" name="yearPublish" value="${this.data.yearPublish}" class="${this.yearPublishState}">
          <label for="yearPublish">Year of Publish</label>
        </div>
      </div>
      <div class="row mb-0">
        <div class="input-field col s12">
          <input type="text" name="title" value="${this.data.title}" class="${this.titleState}">
          <label for="title">Title</label>
        </div>
      </div>
      <div class="row mb-0">
        <div class="input-field col s12">
          <input type="text" name="URL" value="${this.data.URL}" class="${this.URLState}">
          <label for="URL">URL</label>
        </div>
      </div>
      <a class="waves-effect waves-light btn">Save</a>
    </form>
  </div>
    `
  }

  _toggleFormData() {
    if (this.node.innerHTML.match(/^<form.*/g)) {
      this.node.innerHTML = this._createReference()
    } else {
      this.node.innerHTML = this._createReferenceForm()
    }
  }

  _createElement() {
    this.node = document.createElement("li");
    this.node.classList.add("references");
    this.node.addEventListener("click", this._toggleFormData);
  }

  render() {
    this.node.innerHTML = this._createReference()
    return this.node;
  }
}

module.exports = { Reference };