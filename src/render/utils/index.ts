import { ReferenceData } from '../../main/DataStorage';

export function parseReferenceToText(reference: ReferenceData): string {
  if (reference.authorName === reference.authorSurname) {
    return `${reference.authorSurname}. (${reference.yearPublish}). ${reference.title} Retrieved from <${reference.URL}>`;
  } else {
    return `${reference.authorSurname}, ${reference.authorName}. (${reference.yearPublish}). ${reference.title} Retrieved from <${reference.URL}>`;
  }
}
