import {ValidationControllerFactory, ValidationRules} from "aurelia-validation";
import {inject} from "aurelia-dependency-injection";

@inject(ValidationControllerFactory)
export class Contact {
  controller = null;
  isChecked: boolean;
  name: string;
  email: string;
  number: number;
  text: string;

  constructor(controllerFactory) {

    this.controller = controllerFactory.createForCurrentScope();


    ValidationRules
      .ensure('name').required()
      .minLength(3)
      .withMessage('Name must at least be 3 chars long.')
      .ensure('email').required()
      .email()
      .withMessage('Email must contain @ , .')
      .ensure('number').required()
      .minLength(10)
      .matches(new RegExp(/[0-9]/))
      .withMessage('The phone number can only contain digits')
      .ensure('text').required()
      .maxLength(50)
      .withMessage('Your message can contain up 50 characters')
      .on(this);
  }

  get checkedbtn() {
    return !(this.isChecked);
  }

  submit(){
    var contact = {
      name: this.name,
      email: this.email,
      number: this.number,
      text : this.text
    };
    console.log(contact);
  }
}
