import { ReferenceData } from '../References'

export default class ReferencesTemplate {
  referenceList: [Reference];

  constructor(data: [ReferenceData]) {
    data.forEach(referenceData => {
      this.referenceList.push(new Reference(referenceData))
    })
  }

  render() {
    for (const reference of this.referenceList) {
      const node = reference.render()
      const referencesContainer = document.querySelector("ul.list-group");
      referencesContainer.insertAdjacentElement('beforeend', node);
    }
  }
}

class Reference {
  data: ReferenceData
  node!: HTMLLIElement

  constructor(referenceData: ReferenceData) {
    this.data = referenceData
    this.toggleFormData = this.toggleFormData.bind(this)
    this.createElement()
  }

  private checkValues(): boolean {
    for (const values of Object.values(this.data)) {
      if (values === '') {
        return false
      } else {
        return true
      }
    }

  }

  private createReference() {
    if (this.checkValues()) {
      if (this.data.authorSurname === this.data.authorName) {
        return `${this.data.authorSurname}. (${this.data.yearPublish}). ${this.data.title}. Retrieved from &lt;${this.data.URL}&gt;`
      } else {
        return `${this.data.authorSurname}, ${this.data.authorName[0]} . (${this.data.yearPublish}). ${this.data.title}. Retrieved from &lt;${this.data.URL}&gt;`
      }
    } else {
      return 'Some Data is missing'
    }
  }

  private createReferenceForm() {
    let inputFields: string = '';
    for (const value of Object.values(this.data)) {
      if (value === '') {
        inputFields += `<div class="input-field col s4">
        <input type="text" name="${value}" class="invalid" value="${value}" placeholder="${value}">
        <label for="${value}">${value}</label>
        </div>`
      } else {
        inputFields += `<div class="input-field col s4">
        <input type="text" name="${value}" class="valid" value="${value}" placeholder="${value}">
        <label for="${value}">${value}</label>
        </div>`
      }
    }


    return `<div class="row">
    <form action="" id="ref_form" class="col s12">
      <div class="row mb-0">
        ${inputFields}
      </div>
      <a class="waves-effect waves-light btn">Save</a>
    </form>
  </div>
    `
  }

  private toggleFormData() {
    if (this.node.innerHTML.match(/^<form.*/g)) {
      this.node.innerHTML = this.createReference()
    } else {
      this.node.innerHTML = this.createReferenceForm()
    }
  }

  private createElement() {
    this.node = document.createElement("li");
    this.node.classList.add("references");
    this.node.addEventListener("click", this.toggleFormData);
  }

  render() {
    this.node.innerHTML = this.createReference()
    return this.node;
  }
}


